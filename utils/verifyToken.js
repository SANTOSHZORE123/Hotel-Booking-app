import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyToken = (req, res, next,cb) => {
  const token = req.cookies.access_token;
  console.log("this is token",req.cookies)
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    console.log("here is user",req.user.isAdmin)
    cb();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (!req.user.isAdmin||req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    console.log("this is real value",req.user)
    if (req.user.isAdmin=='true'||req.user.isAdmin=="YES") {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};
