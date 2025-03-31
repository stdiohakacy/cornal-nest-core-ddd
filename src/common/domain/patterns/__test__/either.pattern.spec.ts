import { Either, left, right, Left, Right } from '../result.pattern'; // hoặc `either.pattern` nếu bạn tách file

describe('Either<L, R>', () => {
  it('should create a Left instance', () => {
    const result: Either<string, number> = left('Error');
    expect(result).toBeInstanceOf(Left);
    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBe('Error');
  });

  it('should create a Right instance', () => {
    const result: Either<string, number> = right(123);
    expect(result).toBeInstanceOf(Right);
    expect(result.isRight()).toBe(true);
    expect(result.isLeft()).toBe(false);
    expect(result.value).toBe(123);
  });

  it('should distinguish between Left and Right correctly', () => {
    const result1 = left('Invalid');
    const result2 = right('Valid');

    expect(result1.isLeft()).toBe(true);
    expect(result1.isRight()).toBe(false);
    expect(result2.isRight()).toBe(true);
    expect(result2.isLeft()).toBe(false);
  });
});
