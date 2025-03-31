export class BaseIdentifier<T> {
  constructor(private value: T) {
    this.value = value;
  }

  toValue(): T {
    return this.value;
  }

  toString() {
    return String(this.value);
  }

  equals(id?: BaseIdentifier<T>) {
    if (!id) {
      return false;
    }
    if (!(id instanceof this.constructor)) {
      return false;
    }

    return id.toValue() === this.value;
  }
}
