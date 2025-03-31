import { BaseValueObject, ValueObjectProps } from '../base.vo';

interface DummyProps extends ValueObjectProps {
  value: string;
  count: number;
}

class DummyValueObject extends BaseValueObject<DummyProps> {
  constructor(props: DummyProps) {
    super(props);
  }
}

describe('BaseValueObject', () => {
  it('should freeze the props object', () => {
    const vo = new DummyValueObject({ value: 'test', count: 1 });
    expect(Object.isFrozen(vo.props)).toBe(true);
  });

  it('should consider two value objects with same props equal', () => {
    const vo1 = new DummyValueObject({ value: 'hello', count: 3 });
    const vo2 = new DummyValueObject({ value: 'hello', count: 3 });
    expect(vo1.equals(vo2)).toBe(true);
  });

  it('should return false when comparing different values', () => {
    const vo1 = new DummyValueObject({ value: 'A', count: 1 });
    const vo2 = new DummyValueObject({ value: 'B', count: 1 });
    expect(vo1.equals(vo2)).toBe(false);
  });

  it('should return false when comparing with null or undefined', () => {
    const vo = new DummyValueObject({ value: 'hello', count: 5 });
    expect(vo.equals(null)).toBe(false);
    expect(vo.equals(undefined)).toBe(false);
  });

  it('should return false when comparing with non-ValueObject type', () => {
    const vo = new DummyValueObject({ value: 'hello', count: 5 });
    expect(vo.equals({} as any)).toBe(false);
  });
});
