'use server';

import { UserFinder } from '@/modules/User/application/UserFinder';
import { getVerificationTokenByToken } from '../data/get-verification-token-by-token';
import { MongoUserRepository } from '@/modules/User/infrastructure/persistence/MongoUserRepository';
import { UserCreator } from '@/modules/User/application/UserCreator';
import { VerificationTokenDeleter } from '@/modules/VerificationToken/application/VerificationTokenDeleter';
import { MongoVerificationTokenRepository } from '@/modules/VerificationToken/infrastructure/persistence/MongoVerificationTokenRepository';
import { sendRegistrationEmail } from '@/lib';

export const verifyUser = async (token: string) => {
  const verificationToken = await getVerificationTokenByToken(token);

  if (!verificationToken) {
    return {
      error: 'Invalid token!',
    };
  }

  if (verificationToken.expiresAt.value < new Date().getTime()) {
    return {
      error: 'Token expired!',
    };
  }

  const userFinder = new UserFinder(new MongoUserRepository());
  const user = await userFinder.run(verificationToken.email.value);

  if (!user) {
    return {
      error: 'User not found!',
    };
  }

  if (user.emailVerified) {
    return {
      error: 'Email already verified!',
    };
  }

  const email = verificationToken.email.value;

  const userCreator = new UserCreator(new MongoUserRepository());
  await userCreator.run({
    id: user.id.value,
    email,
    emailVerified: new Date().getTime(),
  });

  const tokenDeleter = new VerificationTokenDeleter(new MongoVerificationTokenRepository());
  await tokenDeleter.run(verificationToken.id.value);

  await sendRegistrationEmail(email, email.split('@')[0]);

  return {
    success: 'Your account has been verified!',
  };
};
