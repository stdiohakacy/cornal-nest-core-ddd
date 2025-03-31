import { BaseUniqueEntityId } from '../../identifier/unique-entity.id';
import { BaseEntity } from '../base.entity';

class DummyEntity extends BaseEntity<{ name: string }> {
  get name(): string {
    return this.props.name;
  }
}

describe('BaseEntity', () => {
  it('should create entity with provided ID', () => {
    const id = new BaseUniqueEntityId('123-abc');
    const entity = new DummyEntity({ name: 'Test' }, id);

    expect(entity).toBeDefined();
    expect(entity['_id'].toValue()).toBe('123-abc');
    expect(entity.props.name).toBe('Test');
  });

  it('should create entity with auto-generated ID if not provided', () => {
    const entity = new DummyEntity({ name: 'Auto ID' });

    expect(entity).toBeDefined();
    expect(entity['_id']).toBeInstanceOf(BaseUniqueEntityId);
    expect(entity['_id'].toValue()).toBeDefined();
  });

  it('should consider two entities with same ID as equal', () => {
    const id = new BaseUniqueEntityId('shared-id');
    const entity1 = new DummyEntity({ name: 'Entity 1' }, id);
    const entity2 = new DummyEntity({ name: 'Entity 2' }, id);

    expect(entity1.equals(entity2)).toBe(true);
  });

  it('should not consider two entities with different IDs as equal', () => {
    const entity1 = new DummyEntity({ name: 'One' });
    const entity2 = new DummyEntity({ name: 'Two' });

    expect(entity1.equals(entity2)).toBe(false);
  });

  it('should return false when compared with null', () => {
    const entity = new DummyEntity({ name: 'Test' });
    expect(entity.equals(null as any)).toBe(false);
  });

  it('should return false when compared with non-entity object', () => {
    const entity = new DummyEntity({ name: 'Test' });
    const nonEntity = { _id: new BaseUniqueEntityId('id') };

    expect(entity.equals(nonEntity as any)).toBe(false);
  });

  it('should return true when compared with itself', () => {
    const entity = new DummyEntity({ name: 'Self' });
    expect(entity.equals(entity)).toBe(true);
  });
});
