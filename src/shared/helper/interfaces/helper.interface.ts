import { ENUM_HELPER_DATE_DAY_OF } from '../enums/helper.enum';

// Helper Encryption
export interface HelperJwtVerifyOptionsInterface {
  audience: string;
  issuer: string;
  subject: string;
  secretKey: string;
  ignoreExpiration?: boolean;
}

export interface HelperJwtOptionsInterface
  extends Omit<HelperJwtVerifyOptionsInterface, 'ignoreExpiration'> {
  expiredIn: number | string;
  notBefore?: number | string;
}

// Helper String

export interface HelperStringPasswordOptionsInterface {
  length: number;
}

// Helper Date
export interface HelperDateCreateOptionsInterface {
  dayOf?: ENUM_HELPER_DATE_DAY_OF;
}
