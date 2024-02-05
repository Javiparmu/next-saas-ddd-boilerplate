import { VerificationTokenCreator } from '@/modules/VerificationToken/application/VerificationTokenCreator';
import { VerificationTokenDeleter } from '@/modules/VerificationToken/application/VerificationTokenDeleter';
import { VerificationTokenFinder } from '@/modules/VerificationToken/application/VerificationTokenFinder';
import { MongoVerificationTokenRepository } from '@/modules/VerificationToken/infrastructure/persistence/MongoVerificationTokenRepository';
import { randomUUID } from 'crypto';
import { sendVerificationEmail } from '../../lib';
import { UserCreator } from '@/modules/User/application/UserCreator';
import { MongoUserRepository } from '@/modules/User/infrastructure/persistence/MongoUserRepository';
import { hash } from 'bcryptjs';
import { UserFinder } from '@/modules/User/application/UserFinder';

export const generateVerificationToken = async (email: string, password: string) => {
  const tokenFinder = new VerificationTokenFinder(new MongoVerificationTokenRepository());
  const foundToken = await tokenFinder.runByEmail(email);

  if (foundToken) {
    const tokenDeleter = new VerificationTokenDeleter(new MongoVerificationTokenRepository());
    await tokenDeleter.run(foundToken.id.value);
  }

  const token = randomUUID();

  const tokenCreator = new VerificationTokenCreator(new MongoVerificationTokenRepository());
  await tokenCreator.run({
    id: randomUUID(),
    email,
    token,
    expiresAt: new Date().getTime() + 1000 * 60 * 5,
  });

  const hashedPassword = await hash(password, 10);

  const userFinder = new UserFinder(new MongoUserRepository());
  const user = await userFinder.run(email);

  const userCreator = new UserCreator(new MongoUserRepository());
  await userCreator.run({
    id: user ? user.id.value : randomUUID(),
    email,
    password: hashedPassword,
    authProvider: 'credentials',
  });

  await sendVerificationEmail(email, token);
};
