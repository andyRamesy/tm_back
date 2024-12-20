import { User } from '../models/user.model';
import bcryptjs from 'bcryptjs';
import { generateTokenAndSetCookies } from '../utils/generateTokens';
import { Response, Request, NextFunction, RequestHandler } from 'express';

export const signup: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password required' });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = await User.create({ email, password: hashedPassword });

    generateTokenAndSetCookies(newUser._id.toString(), res);

    res.status(201).json({ message: 'User created!!!', user: newUser });
  } catch (error) {
    console.error('Error in signup:', error);
    res.status(500).json({ message: 'Server error' });
    next(error);
  }
};

export const login: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: 'Email and password required' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ success: false, messge: 'Invalid creds' });
    }

    if (!user!.password) {
      res.status(400).json({ message: 'Invalid creds' });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user!.password);

    if (!isPasswordCorrect) {
      res.status(400).json({ success: false, message: 'Invalid creds' });
    }

    const token = generateTokenAndSetCookies(user!._id.toString(), res);

    res.status(200).json({
      success: true,
      user: {
        ...user!.toObject(),
        token,
      },
    });
  } catch (error) {

  }
};

export const logout:RequestHandler = (req: Request, res: Response) => {
  try {
    res.clearCookie('jwt-netflix');
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.log('Error in logout controller', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

export async function authCheck(req: Request, res: Response) {
  try {
    console.log('req.user:', req.user);
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    console.log('Error in authCheck controller', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
