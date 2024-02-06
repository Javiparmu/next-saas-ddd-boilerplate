import { MongooseConnection } from '@/modules/Shared/infrastructure/persistence/MongooseConnection';
import { UserCreator } from '@/modules/User/application/UserCreator';
import { UserDeleter } from '@/modules/User/application/UserDeleter';
import { UserFinder } from '@/modules/User/application/UserFinder';
import { AuthProvider } from '@/modules/User/domain/value-object/UserAuthProvider';
import { MongoUserRepository } from '@/modules/User/infrastructure/persistence/MongoUserRepository';
import { VerificationTokenCreator } from '@/modules/VerificationToken/application/VerificationTokenCreator';
import { VerificationTokenDeleter } from '@/modules/VerificationToken/application/VerificationTokenDeleter';
import { VerificationTokenFinder } from '@/modules/VerificationToken/application/VerificationTokenFinder';
import { MongoVerificationTokenRepository } from '@/modules/VerificationToken/infrastructure/persistence/MongoVerificationTokenRepository';
import { Account, User } from 'next-auth';
import { randomUUID } from 'crypto';

type Awaitable<T> = T | PromiseLike<T>;

type ProviderType = 'oidc' | 'oauth' | 'email' | 'credentials';

interface AdapterUser extends User {
  id: string;
  email: string;
  emailVerified: Date | null;
}

interface AdapterAccount extends Account {
  userId: string;
  type: Extract<ProviderType, 'oauth' | 'oidc' | 'email'>;
}

interface AdapterSession {
  sessionToken: string;
  userId: string;
  expires: Date;
}

interface VerificationToken {
  identifier: string;
  expires: Date;
  token: string;
}

interface Adapter {
  createUser?(user: AdapterUser): Awaitable<AdapterUser>;
  getUser?(id: string): Awaitable<AdapterUser | null>;
  getUserByEmail?(email: string): Awaitable<AdapterUser | null>;
  getUserByAccount?(providerAccountId: Pick<AdapterAccount, 'provider' | 'providerAccountId'>): Awaitable<AdapterUser | null>;
  updateUser?(user: Partial<AdapterUser> & Pick<AdapterUser, 'id'>): Awaitable<AdapterUser>;
  deleteUser?(userId: string): Promise<void> | Awaitable<AdapterUser | null | undefined>;
  linkAccount?(account: AdapterAccount): Promise<void> | Awaitable<AdapterAccount | null | undefined>;
  unlinkAccount?(
    providerAccountId: Pick<AdapterAccount, 'provider' | 'providerAccountId'>,
  ): Promise<void> | Awaitable<AdapterAccount | undefined>;
  createSession?(session: { sessionToken: string; userId: string; expires: Date }): Awaitable<AdapterSession>;
  getSessionAndUser?(sessionToken: string): Awaitable<{ session: AdapterSession; user: AdapterUser } | null>;
  updateSession?(session: Partial<AdapterSession> & Pick<AdapterSession, 'sessionToken'>): Awaitable<AdapterSession | null | undefined>;
  deleteSession?(sessionToken: string): Promise<void> | Awaitable<AdapterSession | null | undefined>;
  createVerificationToken?(verificationToken: VerificationToken): Awaitable<VerificationToken | null | undefined>;
  useVerificationToken?(params: { identifier: string; token: string }): Awaitable<VerificationToken | null>;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
declare module 'next-auth/adapters' {
  type JsonObject = {
    [Key in string]?: JsonValue;
  };
  type JsonArray = JsonValue[];
  type JsonPrimitive = string | number | boolean | null;
  type JsonValue = JsonPrimitive | JsonObject | JsonArray;
  interface AdapterAccount {
    type: 'oauth' | 'email' | 'oidc';
    [key: string]: JsonValue | undefined;
  }
}

export function MongooseAdapter(): Adapter {
  return {
    async createUser({ id, email, emailVerified }) {
      await MongooseConnection.connect();

      console.log('Creating user', id, email, emailVerified);

      const userId = randomUUID();

      const userCreator = new UserCreator(new MongoUserRepository());
      await userCreator.run({
        id: userId,
        email,
        emailVerified: emailVerified ? emailVerified.getTime() : undefined,
      });

      return {
        id: userId,
        email,
        emailVerified: emailVerified,
      };
    },
    async getUser(id) {
      await MongooseConnection.connect();

      const userFinder = new UserFinder(new MongoUserRepository());
      const user = await userFinder.runById(id);

      if (!user) return null;

      return {
        id: user.id.value,
        email: user.email?.value ?? '',
        emailVerified: new Date(user.emailVerified?.value ?? 0),
      };
    },
    async getUserByEmail(email) {
      await MongooseConnection.connect();

      const userFinder = new UserFinder(new MongoUserRepository());
      const user = await userFinder.run(email);

      if (!user) return null;

      return {
        id: user.id.value,
        email: user.email?.value ?? '',
        emailVerified: new Date(user.emailVerified?.value ?? 0),
      };
    },
    async getUserByAccount(data) {
      await MongooseConnection.connect();

      const userFinder = new UserFinder(new MongoUserRepository());
      const user = await userFinder.runByProviderAccountId(data.providerAccountId);

      if (!user) return null;

      return {
        id: user.id.value,
        email: user.email?.value ?? '',
        emailVerified: new Date(user.emailVerified?.value ?? 0),
      };
    },
    async updateUser(data) {
      await MongooseConnection.connect();

      const userCreator = new UserCreator(new MongoUserRepository());
      await userCreator.run({
        id: data.id,
        email: data.email,
        emailVerified: data.emailVerified?.getTime(),
      });

      return {
        id: data.id,
        email: data.email ?? '',
        emailVerified: new Date(data.emailVerified ?? 0),
      };
    },
    async deleteUser(id) {
      await MongooseConnection.connect();

      const userCreator = new UserDeleter(new MongoUserRepository());
      await userCreator.run(id);
    },
    linkAccount: async (data) => {
      await MongooseConnection.connect();

      const userCreator = new UserCreator(new MongoUserRepository());
      await userCreator.run({
        id: data.userId,
        email: data.email?.toString(),
        emailVerified: new Date().getTime(),
        authProvider: data.provider as AuthProvider,
        providerAccountId: data.providerAccountId,
      });
    },
    async unlinkAccount() {
      return;
    },
    async getSessionAndUser(sessionToken) {
      await MongooseConnection.connect();

      const userFinder = new UserFinder(new MongoUserRepository());
      const user = await userFinder.runById(sessionToken);

      return {
        user: {
          id: user?.id.value ?? '',
          email: user?.email?.value ?? '',
          emailVerified: new Date(user?.emailVerified?.value ?? 0),
        },
        session: {
          sessionToken,
          userId: user?.id.value ?? '',
          expires: new Date(),
        },
      };
    },
    async createSession(data) {
      return data;
    },
    async updateSession() {
      return null;
    },
    async deleteSession() {
      return null;
    },
    async createVerificationToken(data) {
      await MongooseConnection.connect();

      const tokenCreator = new VerificationTokenCreator(new MongoVerificationTokenRepository());
      await tokenCreator.run({
        id: data.identifier,
        email: 'oauth@email.com',
        token: data.token,
        expiresAt: data.expires.getTime(),
      });

      return data;
    },
    async useVerificationToken(identifier_token) {
      await MongooseConnection.connect();

      const tokenFinder = new VerificationTokenFinder(new MongoVerificationTokenRepository());
      const verificationToken = await tokenFinder.runByToken(identifier_token.identifier);

      if (!verificationToken) return null;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...rest } = verificationToken;

      const tokenDeleter = new VerificationTokenDeleter(new MongoVerificationTokenRepository());
      await tokenDeleter.run(verificationToken.id.value);

      return {
        identifier: verificationToken.id.value,
        token: verificationToken.token.value,
        expires: new Date(verificationToken.expiresAt.value),
      };
    },
  };
}
