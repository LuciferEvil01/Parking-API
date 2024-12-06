import { Log } from '../models/Log';

export const createLog = async (user: string, action: string) => {
  const log = new Log({ user, action });
  await log.save();
  return log;
};

export const getLogs = async () => {
  return await Log.find({});
};
