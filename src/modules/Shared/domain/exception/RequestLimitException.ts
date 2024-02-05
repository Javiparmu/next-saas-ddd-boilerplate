import { CustomException } from './CustomException';

export class RequestLimitException extends CustomException {
  constructor(message: string) {
    super(message, 429);
  }
}
