import { Primitives } from '@/modules/Shared/domain/Primitives';
import { UserEmail } from './value-object/UserEmail';
import { UserId } from './value-object/UserId';
import { UserPassword } from './value-object/UserPassword';
import { UserRole } from './value-object/UserRole';
import { AggregateRoot } from '@/modules/Shared/domain/AggregateRoot';
import { UserAuthProvider } from './value-object/UserAuthProvider';
import { CustomerId } from '@/modules/Customer/domain/value-object/CustomerId';
import { SubscriptionId } from '@/modules/Subscription/domain/value-object/SubscriptionId';
import { UnixDate } from '@/modules/Shared/domain/value-object/UnixDate';

export class User extends AggregateRoot {
  readonly id: UserId;
  readonly email?: UserEmail;
  readonly emailVerified?: UnixDate;
  readonly password?: UserPassword;
  readonly authProvider?: UserAuthProvider;
  readonly providerAccountId?: string;
  readonly role?: UserRole;
  readonly plan?: SubscriptionId;
  readonly customerId?: CustomerId;

  constructor({
    id,
    email,
    emailVerified,
    password,
    authProvider,
    providerAccountId,
    role,
    plan,
    customerId,
  }: {
    id: UserId;
    email?: UserEmail;
    emailVerified?: UnixDate;
    password?: UserPassword;
    authProvider?: UserAuthProvider;
    providerAccountId?: string;
    role?: UserRole;
    plan?: SubscriptionId;
    customerId?: CustomerId;
  }) {
    super();
    this.id = id;
    this.email = email;
    this.emailVerified = emailVerified;
    this.password = password;
    this.authProvider = authProvider;
    this.providerAccountId = providerAccountId;
    this.role = role;
    this.plan = plan;
    this.customerId = customerId;
  }

  static fromPrimitives({
    id,
    email,
    emailVerified,
    password,
    authProvider,
    providerAccountId,
    role,
    plan,
    customerId,
  }: Primitives<User>): User {
    return new User({
      id: new UserId(id),
      email: new UserEmail(email!),
      emailVerified: emailVerified ? new UnixDate(emailVerified) : undefined,
      password: password ? new UserPassword(password) : undefined,
      authProvider: new UserAuthProvider(authProvider!),
      providerAccountId: providerAccountId!,
      role: new UserRole(role!),
      plan: new SubscriptionId(plan!),
      customerId: customerId ? new CustomerId(customerId!) : undefined,
    });
  }

  toPrimitives(): Primitives<User> {
    return {
      id: this.id.value,
      email: this.email?.value,
      emailVerified: this.emailVerified?.value,
      password: this.password?.value,
      authProvider: this.authProvider?.value,
      providerAccountId: this.providerAccountId,
      role: this.role?.value,
      plan: this.plan?.value,
      customerId: this.customerId?.value,
    };
  }
}
