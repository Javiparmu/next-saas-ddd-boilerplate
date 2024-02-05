import { CustomException } from './CustomException';

export class TooManyConnectionAttemptsException extends CustomException {
  constructor(databaseName?: string) {
    super('Too many connection attempts' + databaseName ? `to ${databaseName}` : '', 429);
  }
}
