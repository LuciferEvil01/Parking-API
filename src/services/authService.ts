import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';

export const generateAuthToken = (user: any) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET as string, {
    expiresIn: '1h'
  });
};

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 8);
};

export const verifyPassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const findUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};
