import { Response, NextFunction } from 'express';

export const requiresAuth = (req: AppRequest, res: Response, next: NextFunction) => {
  if (!req.session.isAuthenticated) return res.status(401).send();
  next();
};
