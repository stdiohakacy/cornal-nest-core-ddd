import { Result } from './result.pattern';

export type GuardResponse = string;

export interface GuardArgumentInterface<T> {
  argument: T;
  argumentName: string;
}

export type GuardArgumentCollection<T = unknown> = GuardArgumentInterface<T>[];

export class Guard {
  public static combine(
    guardResults: Result<GuardResponse>[],
  ): Result<GuardResponse> {
    for (const result of guardResults) {
      if (result.isFailure) return result;
    }
    return Result.ok();
  }

  public static greaterThan(
    minValue: number,
    actualValue: number,
  ): Result<GuardResponse> {
    return actualValue > minValue
      ? Result.ok()
      : Result.fail(
          `Number given {${actualValue}} is not greater than {${minValue}}`,
        );
  }

  public static againstAtLeast(
    numChars: number,
    text: string,
  ): Result<GuardResponse> {
    return text.length >= numChars
      ? Result.ok()
      : Result.fail(`Text is not at least ${numChars} chars.`);
  }

  public static againstAtMost(
    numChars: number,
    text: string,
  ): Result<GuardResponse> {
    return text.length <= numChars
      ? Result.ok()
      : Result.fail(`Text is greater than ${numChars} chars.`);
  }

  public static againstNullOrUndefined<T>(
    argument: T | null | undefined,
    argumentName: string,
  ): Result<GuardResponse> {
    if (argument === null || argument === undefined) {
      return Result.fail(`${argumentName} is null or undefined`);
    }
    return Result.ok();
  }

  public static againstNullOrUndefinedBulk<T>(
    args: GuardArgumentCollection<T>,
  ): Result<GuardResponse> {
    for (const arg of args) {
      const result = this.againstNullOrUndefined(
        arg.argument,
        arg.argumentName,
      );
      if (result.isFailure) return result;
    }
    return Result.ok();
  }

  public static isOneOf<T>(
    value: T,
    validValues: T[],
    argumentName: string,
  ): Result<GuardResponse> {
    const isValid = validValues.includes(value);
    return isValid
      ? Result.ok()
      : Result.fail(
          `${argumentName} isn't one of the allowed values: ${JSON.stringify(validValues)}. Got "${value}".`,
        );
  }

  public static inRange(
    num: number,
    min: number,
    max: number,
    argumentName: string,
  ): Result<GuardResponse> {
    const isInRange = num >= min && num <= max;
    return isInRange
      ? Result.ok()
      : Result.fail(`${argumentName} is not within range ${min} to ${max}.`);
  }

  public static allInRange(
    numbers: number[],
    min: number,
    max: number,
    argumentName: string,
  ): Result<GuardResponse> {
    for (const num of numbers) {
      const result = this.inRange(num, min, max, argumentName);
      if (result.isFailure) {
        return Result.fail(`${argumentName} is not within the range.`);
      }
    }
    return Result.ok();
  }
}
