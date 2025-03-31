export abstract class DomainException extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export namespace DomainException {
  export class InvalidOrderItemException extends DomainException {}
  export class OrderValidationException extends DomainException {}
  export class OrderAlreadyExistsException extends DomainException {}
  export class OrderNotFoundException extends DomainException {}
}
