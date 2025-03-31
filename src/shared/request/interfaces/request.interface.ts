import { Request } from 'express';

export class RequestApplicationInterface extends Request {
  __language: string;
  __version: string;
}
