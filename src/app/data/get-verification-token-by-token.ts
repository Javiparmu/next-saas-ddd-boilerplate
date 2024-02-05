import { VerificationTokenFinder } from '@/modules/VerificationToken/application/VerificationTokenFinder';
import { MongoVerificationTokenRepository } from '@/modules/VerificationToken/infrastructure/persistence/MongoVerificationTokenRepository';

export const getVerificationTokenByToken = (token: string) => {
  const tokenFinder = new VerificationTokenFinder(new MongoVerificationTokenRepository());
  const verificationToken = tokenFinder.runByToken(token);

  return verificationToken;
};
