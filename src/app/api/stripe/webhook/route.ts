import { createCustomerAdapter } from '@/app/adapters/customer-adapter';
import { createInvoiceAdapter } from '@/app/adapters/invoice-adapter';
import { createSubscriptionAdapter } from '@/app/adapters/subscription-adapter';
import { createSubscriptionDeletedAdapter } from '@/app/adapters/subscription-deleted-adapter';
import { sendRefundEmail, sendSubscriptionUpdatedEmail, stripe } from '@/lib';
import { getPlanFromId } from '@/app/utils';
import { CustomerCreator } from '@/modules/Customer/application/CustomerCreator';
import { CustomerDeleter } from '@/modules/Customer/application/CustomerDeleter';
import { CustomerFinder } from '@/modules/Customer/application/CustomerFinder';
import { MongoCustomerRepository } from '@/modules/Customer/infrastructure/persistence/MongoCustomerRepository';
import { InvoiceCreator } from '@/modules/Invoice/application/InvoiceCreator';
import { MongoInvoiceRepository } from '@/modules/Invoice/infrastructure/persistence/MongoInvoiceRepository';
import { SubscriptionCreator } from '@/modules/Subscription/application/SubscriptionCreator';
import { SubscriptionDeleter } from '@/modules/Subscription/application/SubscriptionDeleter';
import { MongoSubscriptionRepository } from '@/modules/Subscription/infrastructure/persistence/MongoSubscriptionRepository';
import { UserCreator } from '@/modules/User/application/UserCreator';
import { UserFinder } from '@/modules/User/application/UserFinder';
import { UserSubscriptionCreator } from '@/modules/User/application/UserSubscriptionCreator';
import { MongoUserRepository } from '@/modules/User/infrastructure/persistence/MongoUserRepository';
import { MongoUserSubscriptionRepository } from '@/modules/User/infrastructure/persistence/MongoUserSubscriptionRepository';
import { randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const sig = req.headers.get('Stripe-Signature') as string;
  const rawBody = await req.text();

  let event;

  const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? '';

  try {
    if (!sig || !stripeWebhookSecret) return NextResponse.json('No signature or secret', { status: 400 });

    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET ?? '');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(`Webhook Error: ${error.message}`, { status: 400 });
  }

  switch (event.type) {
    case 'customer.created':
      const customerCreated = event.data.object;

      const customerCreator = new CustomerCreator(new MongoCustomerRepository());
      await customerCreator.run(createCustomerAdapter(customerCreated));

      const userFinder = new UserFinder(new MongoUserRepository());
      const user = await userFinder.run(customerCreated.email!);

      const userCreator = new UserCreator(new MongoUserRepository());
      await userCreator.run({
        id: user?.id.value ?? randomUUID(),
        email: customerCreated.email?.toString(),
        customerId: customerCreated.id,
        authProvider: !user ? 'customer' : undefined,
      });

      break;
    case 'customer.deleted':
      const customerDeleted = event.data.object;

      const customerDeleter = new CustomerDeleter(new MongoCustomerRepository());
      await customerDeleter.run(customerDeleted.id);

      break;
    case 'customer.updated':
      const customerUpdated = event.data.object;

      const customerUpdater = new CustomerCreator(new MongoCustomerRepository());
      await customerUpdater.run(createCustomerAdapter(customerUpdated));

      break;
    case 'customer.subscription.created':
      const subscriptionCreated = event.data.object;

      const subscriptionCreator = new SubscriptionCreator(new MongoSubscriptionRepository());
      await subscriptionCreator.run(createSubscriptionAdapter(subscriptionCreated));

      break;
    case 'customer.subscription.deleted':
      const subscriptionDeleted = event.data.object;

      const subscriptionDeleter = new SubscriptionDeleter(new MongoSubscriptionRepository());
      await subscriptionDeleter.run(createSubscriptionDeletedAdapter(subscriptionDeleted));

      break;
    case 'customer.subscription.updated':
      const subscriptionUpdated = event.data.object;

      const subscriptionUpdater = new SubscriptionCreator(new MongoSubscriptionRepository());
      await subscriptionUpdater.run(createSubscriptionAdapter(subscriptionUpdated));

      const userSubscriptionCreator = new UserSubscriptionCreator(new MongoUserSubscriptionRepository());
      await userSubscriptionCreator.run({
        id: subscriptionUpdated.id,
        stripeCurrentPeriodEnd: subscriptionUpdated.current_period_end * 1000,
        stripePriceId: subscriptionUpdated.items.data[0].price.id,
      });

      const customerFinder = new CustomerFinder(new MongoCustomerRepository());
      const customer = await customerFinder.run(subscriptionUpdated.customer.toString());

      const planName = getPlanFromId(subscriptionUpdated.items.data[0].price.id);

      if (customer && planName) {
        await sendSubscriptionUpdatedEmail(customer.email!.value, customer.email!.value.split('@')[0], planName);
      }

      break;
    case 'charge.refunded':
      const chargeRefunded = event.data.object;

      if (chargeRefunded.invoice) {
        const invoiceRefundedCreator = new InvoiceCreator(new MongoInvoiceRepository());
        await invoiceRefundedCreator.run({
          id: chargeRefunded.invoice.toString(),
          refunded: true,
          created: chargeRefunded.created,
        });
      }

      if (chargeRefunded.receipt_email) {
        await sendRefundEmail(chargeRefunded.receipt_email.toString(), chargeRefunded.receipt_email.toString().split('@')[0]);
      }

      break;
    case 'invoice.created':
      const invoiceCreated = event.data.object;

      const invoiceCreator = new InvoiceCreator(new MongoInvoiceRepository());
      await invoiceCreator.run(createInvoiceAdapter(invoiceCreated));

      break;
    case 'invoice.finalized':
      const invoiceFinalized = event.data.object;

      const invoiceFinalizedCreator = new InvoiceCreator(new MongoInvoiceRepository());
      await invoiceFinalizedCreator.run(createInvoiceAdapter(invoiceFinalized));

      break;
    case 'invoice.payment_failed':
      const invoicePaymentFailed = event.data.object;

      const invoiceFailedCreator = new InvoiceCreator(new MongoInvoiceRepository());
      await invoiceFailedCreator.run(createInvoiceAdapter(invoicePaymentFailed));

      break;
    case 'invoice.payment_succeeded':
      const invoicePaymentSucceeded = event.data.object;

      const invoiceSucceededCreator = new InvoiceCreator(new MongoInvoiceRepository());
      await invoiceSucceededCreator.run(createInvoiceAdapter(invoicePaymentSucceeded));

      break;
    case 'invoice.updated':
      const invoiceUpdated = event.data.object;

      const invoiceUpdatedCreator = new InvoiceCreator(new MongoInvoiceRepository());
      await invoiceUpdatedCreator.run(createInvoiceAdapter(invoiceUpdated));

      break;
    case 'invoice.voided':
      const invoiceVoided = event.data.object;

      const invoiceVoidedCreator = new InvoiceCreator(new MongoInvoiceRepository());
      await invoiceVoidedCreator.run({
        id: invoiceVoided.id,
        status: 'void',
        created: invoiceVoided.created,
      });

      break;
    case 'invoice.marked_uncollectible':
      const invoiceMarkedUncollectible = event.data.object;

      const invoiceMarkedUncollectibleCreator = new InvoiceCreator(new MongoInvoiceRepository());
      await invoiceMarkedUncollectibleCreator.run({
        id: invoiceMarkedUncollectible.id,
        status: 'uncollectible',
        created: invoiceMarkedUncollectible.created,
      });

      break;
    case 'invoice.sent':
      const invoiceSent = event.data.object;

      const invoiceSentCreator = new InvoiceCreator(new MongoInvoiceRepository());
      await invoiceSentCreator.run({
        id: invoiceSent.id,
        status: 'open',
        created: invoiceSent.created,
      });

      break;
    case 'invoice.upcoming':
      const invoiceUpcoming = event.data.object;

      const invoiceUpcomingCreator = new InvoiceCreator(new MongoInvoiceRepository());
      await invoiceUpcomingCreator.run({
        id: invoiceUpcoming.id,
        status: 'upcoming',
        created: invoiceUpcoming.created,
      });

      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
