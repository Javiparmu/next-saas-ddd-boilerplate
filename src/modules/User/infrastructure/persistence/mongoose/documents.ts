export interface UserDocument {
  _id: string;
  name: string;
  email: string;
  emailVerified: number;
  password: string;
  authProvider: string;
  providerAccountId: string;
  plan: string;
  role: string;
  customerId: string;
}

export interface UserSubscriptionDocument {
  _id: string;
  userId: string;
  stripeCurrentPeriodEnd: number;
  requestCount: number;
  requestLimit: number;
  requestReset: number;
}
