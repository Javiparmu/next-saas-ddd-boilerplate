export class CustomException extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
    this.name = this.constructor.name;
  }
}
