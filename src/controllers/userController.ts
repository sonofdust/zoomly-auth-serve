import {Request, Response} from "express";
import bcrypt from "bcryptjs";

import {
  hashPassword,
  getAccessToken,
  getRefreshToken,
} from "../services/authService";
import {pool} from "../database";

export async function login(req: Request, res: Response) {
  const {email, password} = req.body;

  try {
    // Fetch user data from the database based on the email
    const result = await pool.query('SELECT * FROM "users" WHERE email = $1', [
      email,
    ]);
    const user = result.rows[0];

    // If no user found, handle the appropriate response
    if (!user) {
      return res.status(404).json({error: "User not found"});
    }

    // Compare the plaintext password with the stored encrypted password
    const isMatch = await bcrypt.compare(password, user.password);

    // If the passwords match, authentication is successful
    if (isMatch) {
      // Perform further actions, such as generating a JWT token or setting session data
      const token = getAccessToken({email, password});
      const refreshToken = getRefreshToken({email, password});
      return res.status(200).json({token, refreshToken});
    }

    // If the passwords don't match, handle the appropriate response
    return res.status(401).json({message: "Invalid password"});
  } catch (error) {
    // Handle any errors that occur during the login process
    console.error("Error logging in:", error);
    return res.status(500).json({message: "Internal server error"});
  }
}
