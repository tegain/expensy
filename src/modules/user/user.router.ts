import express from 'express';
import { UserController } from './user.controller';

export const UserRouter: express.Router = express.Router();

UserRouter.post('/users', UserController.create);
UserRouter.get('/users/me', UserController.getCurrentUser);
UserRouter.get('/users/:id', UserController.findById);
