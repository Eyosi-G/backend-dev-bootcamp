import * as userRespository from "../repositories/user.repository";

export const findUserById = (id) => {
  return userRespository.findUserById(id);
};

export const createUser = (user) => {
  return userRespository.createUser(user);
};

export const findUserByUserName = (username) => {
  return userRespository.findUserByUserName(username);
};
