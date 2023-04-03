import { CustomError } from './custom-error'

export class DatabseConnectionError extends CustomError {
  statusCode = 500
  reason = 'Error connecting to database'

  constructor() {
    super('Error connecting to database')
    // Need the next line of code only because we are extending a built-in class
    Object.setPrototypeOf(this, DatabseConnectionError.prototype)
  }

  serializeErrors() {
    return [{ message: this.reason }]
  }
}
