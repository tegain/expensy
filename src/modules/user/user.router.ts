import express from 'express';
import { UserController } from './user.controller';
import { requiresAuth } from '@src/middlewares/requiresAuth';

export const UserRouter: express.Router = express.Router();

/** POST /users */
UserRouter.post('/users', UserController.create);

/** POST /users/register */
UserRouter.post('/users/register', UserController.create);

/** POST /users/auth */
UserRouter.post('/users/auth', UserController.login);

/** POST /users/logout */
UserRouter.post('/users/logout',requiresAuth, UserController.logout);

/** GET /users/me */
UserRouter.get('/users/me', requiresAuth, UserController.getCurrentUser);

/** GET /users/:id */
UserRouter.get('/users/:id', requiresAuth, UserController.findById);
