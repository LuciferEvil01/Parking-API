import { Request, Response } from 'express';
import { Log } from '../models/Log';

export const getLogs = async (req: Request, res: Response) => {
  try {
    const logs = await Log.find({});
    res.send(logs);
  } catch (error) {
    res.status(500).send();
  }
};
