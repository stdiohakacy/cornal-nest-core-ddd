import { Result } from '../result.pattern';

describe('Result<T>', () => {
  it('should return a successful result with value', () => {
    const result = Result.ok<string>('Hello');
    expect(result.isSuccess).toBe(true);
    expect(result.isFailure).toBe(false);
    expect(result.getValue()).toBe('Hello');
  });

  it('should return a failure result with error', () => {
    const result = Result.fail<string>('Something went wrong');
    expect(result.isSuccess).toBe(false);
    expect(result.isFailure).toBe(true);
    expect(result.getErrorValue()).toBe('Something went wrong');
  });

  it('should throw if getValue is called on failure', () => {
    const result = Result.fail<string>('Some error');
    expect(() => result.getValue()).toThrowError();
  });

  it('should throw if a success result is created with error', () => {
    expect(() => new Result(true, 'Error but success')).toThrowError();
  });

  it('should throw if a failure result is created without error', () => {
    expect(() => new Result(false)).toThrowError();
  });

  it('should return the first failure from combine', () => {
    const result1 = Result.ok('First');
    const result2 = Result.fail('Failed');
    const result3 = Result.ok('Third');

    const combined = Result.combine([result1, result2, result3]);
    expect(combined.isFailure).toBe(true);
    expect(combined.getErrorValue()).toBe('Failed');
  });

  it('should return ok if all results are successful', () => {
    const result1 = Result.ok('One');
    const result2 = Result.ok('Two');
    const result3 = Result.ok('Three');

    const combined = Result.combine([result1, result2, result3]);
    expect(combined.isSuccess).toBe(true);
  });
});
