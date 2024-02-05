import { CustomException } from './CustomException';

export class InvalidRequestException extends CustomException {
  constructor(message: string) {
    super(message, 400);
  }
}
