import {Request} from "express";

export interface User {
  id: number;
  email: string;
  password: string;
}

export interface AuthenticatedRequest extends Request {
  email?: string; // Add the 'email' property to the extended interface
}
