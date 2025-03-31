import { Guard } from '../guard.pattern';

describe('Guard', () => {
  describe('againstNullOrUndefined', () => {
    it('should fail when value is null', () => {
      const result = Guard.againstNullOrUndefined(null, 'testField');
      expect(result.isFailure).toBe(true);
      expect(result.getErrorValue()).toBe('testField is null or undefined');
    });

    it('should fail when value is undefined', () => {
      const result = Guard.againstNullOrUndefined(undefined, 'testField');
      expect(result.isFailure).toBe(true);
    });

    it('should pass when value is valid', () => {
      const result = Guard.againstNullOrUndefined('value', 'testField');
      expect(result.isSuccess).toBe(true);
    });
  });

  describe('againstNullOrUndefinedBulk', () => {
    it('should fail when at least one field is null', () => {
      const args = [
        { argument: 'value', argumentName: 'field1' },
        { argument: null, argumentName: 'field2' },
      ];
      const result = Guard.againstNullOrUndefinedBulk(args);
      expect(result.isFailure).toBe(true);
      expect(result.getErrorValue()).toContain('field2');
    });

    it('should pass when all fields are valid', () => {
      const args = [
        { argument: 'value', argumentName: 'field1' },
        { argument: 123, argumentName: 'field2' },
      ];
      const result = Guard.againstNullOrUndefinedBulk<string | number>(args);
      expect(result.isSuccess).toBe(true);
    });
  });

  describe('greaterThan', () => {
    it('should pass if actual is greater than min', () => {
      const result = Guard.greaterThan(10, 20);
      expect(result.isSuccess).toBe(true);
    });

    it('should fail if actual is less than or equal to min', () => {
      const result = Guard.greaterThan(10, 10);
      expect(result.isFailure).toBe(true);
    });
  });

  describe('againstAtLeast', () => {
    it('should pass if text is at least given length', () => {
      const result = Guard.againstAtLeast(3, 'abcd');
      expect(result.isSuccess).toBe(true);
    });

    it('should fail if text is too short', () => {
      const result = Guard.againstAtLeast(5, 'abc');
      expect(result.isFailure).toBe(true);
    });
  });

  describe('againstAtMost', () => {
    it('should pass if text is within max length', () => {
      const result = Guard.againstAtMost(5, 'abc');
      expect(result.isSuccess).toBe(true);
    });

    it('should fail if text exceeds max length', () => {
      const result = Guard.againstAtMost(3, 'hello');
      expect(result.isFailure).toBe(true);
    });
  });

  describe('isOneOf', () => {
    it('should pass if value is in list', () => {
      const result = Guard.isOneOf('red', ['red', 'blue'], 'color');
      expect(result.isSuccess).toBe(true);
    });

    it('should fail if value is not in list', () => {
      const result = Guard.isOneOf('green', ['red', 'blue'], 'color');
      expect(result.isFailure).toBe(true);
      expect(result.getErrorValue()).toContain('color');
    });
  });

  describe('inRange', () => {
    it('should pass if number is within range', () => {
      const result = Guard.inRange(5, 1, 10, 'age');
      expect(result.isSuccess).toBe(true);
    });

    it('should fail if number is outside range', () => {
      const result = Guard.inRange(15, 1, 10, 'age');
      expect(result.isFailure).toBe(true);
    });
  });

  describe('allInRange', () => {
    it('should pass if all numbers are within range', () => {
      const result = Guard.allInRange([2, 4, 6], 1, 10, 'score');
      expect(result.isSuccess).toBe(true);
    });

    it('should fail if any number is outside range', () => {
      const result = Guard.allInRange([2, 4, 20], 1, 10, 'score');
      expect(result.isFailure).toBe(true);
    });
  });

  describe('combine', () => {
    it('should return first failure', () => {
      const r1 = Guard.againstNullOrUndefined('valid', 'field1');
      const r2 = Guard.againstNullOrUndefined(undefined, 'field2');
      const result = Guard.combine([r1, r2]);
      expect(result.isFailure).toBe(true);
      expect(result.getErrorValue()).toContain('field2');
    });

    it('should return success if all pass', () => {
      const r1 = Guard.againstNullOrUndefined('valid', 'field1');
      const r2 = Guard.againstNullOrUndefined(123, 'field2');
      const result = Guard.combine([r1, r2]);
      expect(result.isSuccess).toBe(true);
    });
  });
});
