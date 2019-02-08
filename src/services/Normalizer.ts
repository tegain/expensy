import Joi, { JoiObject } from 'joi';

export class Normalizer {
  /**
   * Normalize and validate request data before inserting into database
   *
   * @param {object} data
   * @param {JoiObject} schema
   * @return {Promise<T>}
   * @static
   */
  public static async normalize<T> (data: object, schema: JoiObject): Promise<T> {
    try {
      const normalizedData: any = await Joi.attempt(data, schema);
      return normalizedData as T;
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
