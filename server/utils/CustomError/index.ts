class CustomError extends Error {
  public code: number;

  constructor(message: string, code: number) {
    super(message);
    this.code = code;
    this.message = message;
  }
}

export default CustomError;
