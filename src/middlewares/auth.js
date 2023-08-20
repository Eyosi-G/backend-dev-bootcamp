import { AppError } from "../helpers/app-error.js";
import * as userService from "../services/user.service.js";
import * as jwt from "../helpers/jwt.js";
export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.autorization;
    if (!token) throw new AppError("Unauthorized", 401);
    const { id } = await jwt.verifyToken(token, process.env.SECRET);
    const user = await userService.findUserById(id);
    if (!user) throw new AppError("Unauthorized", 401);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export const authorize =
  (roles = []) =>
  (req, res, next) => {
    try {
      if (roles.includes(req.user.role)) {
        next();
      } else {
        throw new AppError("Unauthorized", 401);
      }
    } catch (error) {
      next(error);
    }
  };
