export class ApiError extends Error {
  messages: any;

  constructor(message: any) {
    super();
    this.messages = message;
  }


}
