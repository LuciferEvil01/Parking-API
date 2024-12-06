import { IUser } from '../models/User';
import 'express';

declare module 'express' {
    interface Request {
        user?: IUser;
    }
}