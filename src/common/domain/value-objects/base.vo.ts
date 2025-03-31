export interface ValueObjectProps {
  [index: string]: unknown;
}

/**
 * @desc ValueObjects are objects that we determine their
 * equality through their structural property.
 */
export abstract class BaseValueObject<T extends ValueObjectProps> {
  public readonly props: T;

  constructor(props: T) {
    this.props = Object.freeze({ ...props });
  }

  public equals(vo?: BaseValueObject<T>) {
    if (!vo || !(vo instanceof BaseValueObject)) {
      return false;
    }
    return Object.keys(this.props).every(
      (key) => this.props[key] === vo?.props[key],
    );
  }
}
