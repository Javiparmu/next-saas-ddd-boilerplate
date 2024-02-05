import { CustomException } from './CustomException';

export class InternalServerErrorException extends CustomException {
  constructor(message?: string) {
    super(message ?? 'Internal Server Error', 500);
  }
}
