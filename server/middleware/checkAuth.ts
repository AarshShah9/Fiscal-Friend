import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

require('dotenv').config('../.env');
const jwt = require('jsonwebtoken');

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(400)
      .json({ success: false, message: 'User not authenticated' });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    //Try to find user
    const user = await User.findById(decodedToken.userId);
    if (user) {
      req.body.user = user._id;
      req.body.fullUser = {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
      };
      next();
    } else {
      return res
        .status(400)
        .json({ success: false, message: 'User not authenticated' });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'User not authenticated',
      error: error,
    });
  }
};
