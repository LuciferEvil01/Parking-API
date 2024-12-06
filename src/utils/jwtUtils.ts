import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET as string;

export const generateToken = (payload: object, expiresIn: string | number = '1h') => {
  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error('Invalid token');
  }
};
