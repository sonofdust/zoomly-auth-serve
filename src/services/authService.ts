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

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, config.secretKey, {expiresIn: "2h"});
};

export const authenticateToken = () => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.sendStatus(401);
    }

    jwt.verify(token, config.secretKey, (err, decoded: any) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.email = decoded.email;
      next();
    });
  };
};

export const getSignToken = (email: string) =>
  jwt.sign({userId: email}, config.secretKey, {
    expiresIn: "1h",
  });
