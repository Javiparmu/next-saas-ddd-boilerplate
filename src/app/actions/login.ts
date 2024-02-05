'use server';

import { signIn } from '@/lib';
import { generateVerificationToken } from '../data/generate-verification-token';
import { AuthError } from 'next-auth';
import { UserFinder } from '@/modules/User/application/UserFinder';
import { MongoUserRepository } from '@/modules/User/infrastructure/persistence/MongoUserRepository';
import { DEFAULT_LOGIN_REDIRECT } from '../routes';

export const login = async (email: string, password: string, callbackUrl: string | null) => {
  const userFinder = new UserFinder(new MongoUserRepository());
  const user = await userFinder.run(email);

  if (!user || !user.emailVerified) {
    await generateVerificationToken(email, password);

    return {
      success: 'A verification link has been sent to your email!',
    };
  } else {
    try {
      await signIn('credentials', {
        email,
        password,
        redirectTo: callbackUrl ?? DEFAULT_LOGIN_REDIRECT,
      });
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return { error: 'Invalid credentials!' };
          default:
            return { error: 'Something went wrong!' };
        }
      }

      throw error;
    }
  }
};
