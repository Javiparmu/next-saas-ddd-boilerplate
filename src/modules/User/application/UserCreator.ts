import { UserRepository } from '../domain/UserRepository';
import { UserId } from '../domain/value-object/UserId';
import { UserEmail } from '../domain/value-object/UserEmail';
import { UserPassword } from '../domain/value-object/UserPassword';
import { User } from '../domain/User';
import { AuthProvider, UserAuthProvider } from '../domain/value-object/UserAuthProvider';
import { InvalidRequestException } from '@/modules/Shared/domain/exception/InvalidRequestException';
import { UnixDate } from '@/modules/Shared/domain/value-object/UnixDate';

export class UserCreator {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async run({
    id,
    email,
    emailVerified,
    password,
    authProvider,
    providerAccountId,
    customerId,
  }: {
    id: string;
    email?: string;
    emailVerified?: number;
    password?: string;
    authProvider?: AuthProvider;
    providerAccountId?: string;
    customerId?: string;
  }): Promise<void> {
    if (authProvider === 'credentials' && !password) {
      throw new InvalidRequestException('Password is required');
    }

    const user = new User({
      id: new UserId(id),
      email: email ? new UserEmail(email) : undefined,
      emailVerified: emailVerified ? new UnixDate(emailVerified) : undefined,
      password: password ? new UserPassword(password) : undefined,
      authProvider: authProvider ? new UserAuthProvider(authProvider) : undefined,
      providerAccountId: providerAccountId ?? undefined,
      customerId: customerId ? new UserId(customerId) : undefined,
    });

    await this.repository.save(user);
  }
}
