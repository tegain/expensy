import express from 'express';
import { UserController } from './user.controller';
import { requiresAuth } from '@src/middlewares/requiresAuth';

export const UserRouter: express.Router = express.Router();

UserRouter.post('/users', UserController.create);
UserRouter.post('/users/register', UserController.create);
UserRouter.post('/users/auth', UserController.login);
UserRouter.post('/users/logout',requiresAuth, UserController.logout);
UserRouter.get('/users/me', requiresAuth, UserController.getCurrentUser);
UserRouter.get('/users/:id', requiresAuth, UserController.findById);
