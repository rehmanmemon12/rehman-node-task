export class ApiResponse {
  message: string;
  payload: any;


  constructor(message: string, payload:any) {
    this.message = message;
    this.payload = payload;
  }
}
