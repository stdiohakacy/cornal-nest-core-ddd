import { HelperStringPasswordOptionsInterface } from './helper.interface';

export interface HelperStringServiceInterface {
  randomReference(length: number): string;
  random(length: number): string;
  censor(text: string): string;
  checkPasswordStrength(
    password: string,
    options?: HelperStringPasswordOptionsInterface,
  ): boolean;
  formatCurrency(num: number, locale: string): string;
}
