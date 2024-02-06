import { PlanEnum } from './enums';

const PlanIds = {
  [PlanEnum.BASIC]: process.env.NEXT_PUBLIC_STRIPE_BASIC_PLAN_ID,
  [PlanEnum.STANDARD]: process.env.NEXT_PUBLIC_STRIPE_STANDARD_PLAN_ID,
  [PlanEnum.PREMIUM]: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PLAN_ID,
};

const PlanPaymentUrls = {
  [PlanEnum.BASIC]: process.env.NEXT_PUBLIC_STRIPE_BASIC_PLAN_PAYMENT_URL,
  [PlanEnum.STANDARD]: process.env.NEXT_PUBLIC_STRIPE_STANDARD_PLAN_PAYMENT_URL,
  [PlanEnum.PREMIUM]: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PLAN_PAYMENT_URL,
};

export const getPlanId = (plan: PlanEnum): string => {
  return PlanIds[plan] ?? '';
};

export const getPlanFromId = (planId: string | undefined): PlanEnum | null => {
  if (planId === PlanIds[PlanEnum.BASIC]) return PlanEnum.BASIC;
  if (planId === PlanIds[PlanEnum.STANDARD]) return PlanEnum.STANDARD;
  if (planId === PlanIds[PlanEnum.PREMIUM]) return PlanEnum.PREMIUM;
  return null;
};

export const getPlanPaymentUrl = (plan: PlanEnum): string => {
  return PlanPaymentUrls[plan] ?? '/';
};

export const assertNever = (value: never): never => {
  throw new Error(`Unexpected value: ${JSON.stringify(value)}`);
};
