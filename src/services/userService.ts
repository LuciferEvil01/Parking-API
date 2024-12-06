import { User } from '../models/User';

export const createUser = async (userData: any) => {
  const user = new User(userData);
  await user.save();
  return user;
};

export const getAllUsers = async () => {
  return await User.find({});
};

export const getUserById = async (id: string) => {
  return await User.findById(id);
};

export const updateUser = async (id: string, updates: any) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('User not found');
  }
  Object.assign(user, updates);
  await user.save();
  return user;
};

export const deleteUser = async (id: string) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};
