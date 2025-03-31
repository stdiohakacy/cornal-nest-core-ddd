import { BaseUniqueEntityId } from '../unique-entity.id';

describe('BaseUniqueEntityId', () => {
  it('should generate UUID if no ID is provided', () => {
    const id = new BaseUniqueEntityId();
    const value = id.toValue();
    expect(typeof value).toBe('string');
    expect(value).toHaveLength(36);
  });

  it('should use provided string ID', () => {
    const id = new BaseUniqueEntityId('custom-id');
    expect(id.toValue()).toBe('custom-id');
  });

  it('should use provided number ID', () => {
    const id = new BaseUniqueEntityId(123);
    expect(id.toValue()).toBe(123);
  });

  it('should compare equal IDs correctly', () => {
    const id1 = new BaseUniqueEntityId('abc');
    const id2 = new BaseUniqueEntityId('abc');
    expect(id1.equals(id2)).toBe(true);
  });

  it('should compare different IDs as not equal', () => {
    const id1 = new BaseUniqueEntityId('abc');
    const id2 = new BaseUniqueEntityId('xyz');
    expect(id1.equals(id2)).toBe(false);
  });
});
