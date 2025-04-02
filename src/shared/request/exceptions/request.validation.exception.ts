import { HttpStatus } from '@nestjs/common';
import { ENUM_REQUEST_STATUS_CODE_ERROR } from '../enums/request.status-code';
import { ValidationError } from 'class-validator';

export class RequestValidationException extends Error {
  readonly httpStatus: HttpStatus = HttpStatus.UNPROCESSABLE_ENTITY;
  readonly statusCode: number = ENUM_REQUEST_STATUS_CODE_ERROR.VALIDATION;
  readonly errors: ValidationError[];

  constructor(errors: ValidationError[]) {
    super('request.validation_exception');
    this.errors = errors;
  }
}
