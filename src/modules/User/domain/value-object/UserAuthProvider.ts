import { StringValueObject } from '@/modules/Shared/domain/value-object/StringValueObject';

export type AuthProvider = 'credentials' | 'google' | 'github' | 'customer';

const validAuthProviders: AuthProvider[] = ['credentials', 'google', 'github'];

export class UserAuthProvider extends StringValueObject {
  constructor(value: string) {
    super(value);

    this.assertIsValidProvider();
  }

  assertIsValidProvider(): void {
    if (!validAuthProviders.includes(this.value as AuthProvider)) {
      throw new Error('UserAuthProvider is not valid');
    }
  }
}
