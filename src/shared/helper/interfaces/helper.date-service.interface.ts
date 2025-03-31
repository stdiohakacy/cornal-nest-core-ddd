import { DateObjectUnits, DateTime, Duration } from 'luxon';
import { HelperDateCreateOptionsInterface } from './helper.interface';

export interface HelperDateServiceInterface {
  calculateAge(dateOfBirth: Date, fromYear?: number): Duration;
  checkIso(date: string): boolean;
  checkTimestamp(timestamp: number): boolean;
  getZone(date: Date): string;
  getTimestamp(date: Date): number;
  create(date?: Date, options?: HelperDateCreateOptionsInterface): Date;
  createInstance(date?: Date): DateTime;
  createFromIso(iso: string, options?: HelperDateCreateOptionsInterface): Date;
  createFromTimestamp(
    timestamp?: number,
    options?: HelperDateCreateOptionsInterface,
  ): Date;
  set(date: Date, units: DateObjectUnits): Date;
  forward(date: Date, duration: Duration): Date;
  backward(date: Date, duration: Duration): Date;
}
