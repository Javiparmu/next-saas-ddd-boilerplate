import { StringValueObject } from '@/modules/Shared/domain/value-object/StringValueObject';

export class UserRole extends StringValueObject {
  constructor(value: string) {
    super(value);

    this.assertIsValidRole(value);
  }

  private assertIsValidRole(value: string): void {
    if (!['admin', 'user'].includes(value)) {
      throw new Error('Invalid role');
    }
  }
}
