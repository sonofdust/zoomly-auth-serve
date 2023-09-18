import bcrypt from "bcryptjs";
import {Response, NextFunction} from "express";
import jwt, {Secret} from "jsonwebtoken";
import {config} from "../config";
import {AuthenticatedRequest} from "../models/user";

//const jwtSecret = process.env.JWT_SECRET || "";

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const authenticateToken = () => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.sendStatus(401);
    }

    jwt.verify(token, config.refreshKey, (err, decoded: any) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.email = decoded.email;
      next();
    });
  };
};

export const getAccessToken = (credentials: {
  email: string;
  password: string;
}) =>
  jwt.sign(credentials, config.accessKey, {
    expiresIn: "1h",
  });
export const getRefreshToken = (credentials: {
  email: string;
  password: string;
}) =>
  jwt.sign(credentials, config.refreshKey, {
    expiresIn: "5h",
  });
