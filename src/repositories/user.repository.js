import { UserModel } from "../models/orm/user.model.js";
import * as hash from "../helpers/hash.js";
export const createUser = async (user) => {
  user.password = await hash.hashPassword(user.password);
  const _user = new UserModel(user);
  await _user.save();
};

export const findUserById = (id) => {
  return UserModel.findById(id);
};

export const findUserByUserName = (username) => {
  return UserModel.findOne({ username });
};
