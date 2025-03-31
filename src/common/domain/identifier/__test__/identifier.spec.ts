import { BaseIdentifier } from '../identifier';
import { BaseUniqueEntityId } from '../unique-entity.id';

describe('BaseIdentifier', () => {
  class TestId extends BaseIdentifier<string> {}

  it('should return value using toValue()', () => {
    const id = new TestId('123');
    expect(id.toValue()).toBe('123');
  });

  it('should return string using toString()', () => {
    const id = new TestId('456');
    expect(id.toString()).toBe('456');
  });

  it('should return true for equal IDs', () => {
    const id1 = new TestId('abc');
    const id2 = new TestId('abc');
    expect(id1.equals(id2)).toBe(true);
  });

  it('should return false for different IDs', () => {
    const id1 = new TestId('abc');
    const id2 = new TestId('def');
    expect(id1.equals(id2)).toBe(false);
  });

  it('should return false when comparing with null or undefined', () => {
    const id = new TestId('abc');
    expect(id.equals(undefined)).toBe(false);
    expect(id.equals(null as any)).toBe(false);
  });

  it('should return false when comparing with different class', () => {
    class AnotherId extends BaseIdentifier<string> {}
    const id1 = new TestId('abc');
    const id2 = new AnotherId('abc');
    expect(id1.equals(id2)).toBe(false);
  });
});

describe('BaseUniqueEntityId', () => {
  it('should generate UUID if not provided', () => {
    const id = new BaseUniqueEntityId();
    expect(typeof id.toValue()).toBe('string');
    expect(id.toString()).toHaveLength(36); // UUID v4
  });

  it('should use the provided id if given', () => {
    const id = new BaseUniqueEntityId('my-id');
    expect(id.toValue()).toBe('my-id');
  });
});
