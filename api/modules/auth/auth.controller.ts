import { compare } from 'bcryptjs';
import * as R from 'ramda';
import { sign } from 'jsonwebtoken';

import { authConfig } from '../../config/authConfig';
import User, { UserModel } from '../user/user.model';

export default class AuthController {
  public static generateAuthToken = (user: UserModel) => {
    const userData = R.omit(['password'], user.toObject());
    return sign(userData, authConfig.jwtSecret);
  };

  public static authUserViaPassword = async (
    email: string,
    password: string,
  ) => {
    const user = await User.findOne({
      email: R.toLower(email),
    });
    let isAuthenticated = false;

    // Verify password
    try {
      if (user && user.password) {
        isAuthenticated = await compare(password, user.password);
      }
    } catch (e) {
      isAuthenticated = false;
    }

    if (!user || !isAuthenticated) {
      throw new Error('Email or password is invalid');
    }

    const token = AuthController.generateAuthToken(user);
    return { token, user };
  };
}
