import express from 'express';
import { UserController } from './user.controller';

export const UserRouter: express.Router = express.Router();

UserRouter.post('/users', UserController.create);
UserRouter.post('/users/auth', UserController.login);
UserRouter.post('/users/logout', UserController.logout);
UserRouter.get('/users/me', UserController.getCurrentUser);
UserRouter.get('/users/:id', UserController.findById);
