import { Response } from 'express';
import { ObjectId } from "mongodb";
import { Normalizer } from "@src/services/Normalizer";
import { UserInterface, UserSchema } from '@src/modules/user/user.interface';
import { User } from './user.model';

export class UserController {
  /**
   * Find one user by ID
   *
   * @param {AppRequest} req
   * @param {Response} res
   * @static
   */
  public static async findById (req: AppRequest, res: Response) {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(404).json({
        data: `Invalid user ID: ${id}.`,
        code: 'USER_NOT_FOUND'
      });
    }

    try {
      const user: UserInterface = await User.findById(id);
      res.status(200).json(user);
    } catch (err) {
      res.status(404).json(err);
    }
  }

  public static async getCurrentUser (req: AppRequest, res: Response) {
    const { _id } = req.user;

    if (!ObjectId.isValid(_id)) {
      return res.status(404).json({
        data: `Invalid user ID: ${_id}.`,
        code: 'USER_NOT_FOUND'
      });
    }

    try {
      const user: UserInterface = await User.findById(_id);
      res.status(200).json(user);
    } catch (err) {
      res.status(404).json(err);
    }
  }

  /**
   * Add one user to database
   *
   * @param {AppRequest} req
   * @param {Response} res
   * @static
   */
  public static async create (req: AppRequest, res: Response) {
    try {
      const validData = await Normalizer.normalize<UserInterface>(req.body, UserSchema);
      const user: User = new User(validData);
      await user.save();
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  }
}
