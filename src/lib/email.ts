import { registrationEmailTemplate, subscriptionEmailTemplate, subscriptionUpdatedEmailTemplate } from '@/utils/email-templates';
import { PlanEnum } from '@/utils/enums';
import { EmailResponse } from '@/utils/interfaces';
import { Resend } from 'resend';

const NO_REPLY_EMAIL = 'noreply@brain-stack.com';

const resend = new Resend(process.env.RESEND_API_KEY ?? '');

// REPLACE App with the name of your app
export const sendRegistrationEmail = async (emailTo: string, username: string): Promise<EmailResponse> => {
  const send = await resend.emails.send({
    from: NO_REPLY_EMAIL,
    to: emailTo,
    subject: 'App Registration',
    html: registrationEmailTemplate(username),
  });

  return send;
};

export const sendSubscriptionEmail = async (emailTo: string, username: string, plan: PlanEnum): Promise<EmailResponse> => {
  const send = await resend.emails.send({
    from: NO_REPLY_EMAIL,
    to: emailTo,
    subject: 'App Subscription',
    html: subscriptionEmailTemplate(username, plan),
  });

  return send;
};

export const sendSubscriptionUpdatedEmail = async (emailTo: string, username: string, plan: PlanEnum): Promise<EmailResponse> => {
  const send = await resend.emails.send({
    from: NO_REPLY_EMAIL,
    to: emailTo,
    subject: 'App Subscription Updated',
    html: subscriptionUpdatedEmailTemplate(username, plan),
  });

  return send;
};

export const sendRefundEmail = async (emailTo: string, username: string): Promise<EmailResponse> => {
  const send = await resend.emails.send({
    from: NO_REPLY_EMAIL,
    to: emailTo,
    subject: 'App Refund',
    html: `Hi ${username}, <br /> <br /> Your subscription has been refunded. <br /> <br /> Thank you for using Brain Stack!`,
  });

  return send;
};

export const sendVerificationEmail = async (emailTo: string, token: string): Promise<EmailResponse> => {
  const send = await resend.emails.send({
    from: NO_REPLY_EMAIL,
    to: emailTo,
    subject: 'App Email Verification',
    html: `Hi, <br /> <br /> Please verify your email by clicking the link below: <br /> <br /> <a href="${process.env.BASE_URL}/auth/verify-email?token=${token}">Verify Email</a>`,
  });

  return send;
};
