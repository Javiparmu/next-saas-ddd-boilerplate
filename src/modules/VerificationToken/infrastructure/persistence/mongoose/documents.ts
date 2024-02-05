export interface VerificationTokenDocument {
  _id: string;
  email: string;
  token: string;
  expiresAt: number;
}
