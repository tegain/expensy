import * as express from 'express';

declare global {
  export interface AppRequest extends express.Request {
    session?: any
  }
}
