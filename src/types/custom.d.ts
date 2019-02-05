import { UserInterface } from '@src/modules/user/user.interface';
import * as express from 'express';

declare global {
  export interface AppRequest extends express.Request {
    user?: UserInterface
  }
}
