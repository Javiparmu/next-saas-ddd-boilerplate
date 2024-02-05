import { CustomException } from './CustomException';

export class ConflictException extends CustomException {
  constructor(message: string) {
    super(message, 409);
  }
}
