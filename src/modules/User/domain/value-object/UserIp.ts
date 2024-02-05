import { StringValueObject } from '@/modules/Shared/domain/value-object/StringValueObject';

export class UserIp extends StringValueObject {
  constructor(value: string) {
    super(value);

    // this.assertIsValidUserIp(value);
  }

  assertIsValidUserIp(value: string): void {
    if (!value.match(/(\d{1,3}\.){3}\d{1,3}/) || value.includes('::')) {
      throw new Error('Invalid user ip');
    }
  }
}
