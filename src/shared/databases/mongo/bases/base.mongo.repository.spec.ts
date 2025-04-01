import { Model } from 'mongoose';
import { BaseMongoRepository } from './base.mongo.repository';

const mockData = [{ name: 'Entity 1' }, { name: 'Entity 2' }];

const mockModel = {
  find: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  skip: jest.fn().mockReturnThis(),
  sort: jest.fn().mockReturnThis(),
  populate: jest.fn().mockReturnThis(),
  session: jest.fn().mockReturnThis(),
  exec: jest.fn().mockResolvedValue(mockData),
};

describe('MongoRepository', () => {
  let repository: BaseMongoRepository<any, any>;

  beforeEach(() => {
    repository = new BaseMongoRepository(mockModel as unknown as Model<any>);
  });

  it('should return all documents with findAll()', async () => {
    const result = await repository.findAll();
    expect(result).toEqual(mockData);
    expect(mockModel.find).toHaveBeenCalled();
  });
  it('should call populate when join is true', async () => {
    await repository.findAll({}, { join: true, order: {} });
    expect(mockModel.populate).toHaveBeenCalled();
  });
});
