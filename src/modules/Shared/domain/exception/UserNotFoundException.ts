import { CustomException } from './CustomException';

export class UserNotFoundException extends CustomException {
  constructor() {
    super('User not found', 404);
  }
}
