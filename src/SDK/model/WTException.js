export class WTException {
  constructor (status,code, message) {
    this.status = status;
    this.code = code;
    this.message = message;
  }
}
