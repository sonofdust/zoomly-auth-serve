import {Request, Response} from "express";
import bcrypt from "bcryptjs";

import {
  generateToken,
  hashPassword,
  getSignToken,
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
      const token = getSignToken(user.id);

      return res.status(200).json({token});
    }

    // If the passwords don't match, handle the appropriate response
    return res.status(401).json({message: "Invalid password"});
  } catch (error) {
    // Handle any errors that occur during the login process
    console.error("Error logging in:", error);
    return res.status(500).json({message: "Internal server error"});
  }
}

export async function signup(req: Request, res: Response) {
  const {email, password} = req.body;
  try {
    // Check if user already exists
    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (userExists.rows.length > 0) {
      return res.status(400).json({message: "User already exists"});
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create the new user
    const newUser = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
      [email, hashedPassword]
    );
    // Generate JWT token
    const token = generateToken({email});
    // Return the newly created user and token
    return res.status(201).json({user: newUser.rows[0], token});
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({message: "Server error"});
  }
}

export async function change_password(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const {email, password} = req.body;

    // Validate the input (e.g., check newPassword length, etc.)

    // Update the user password
    const newPassword = await hashPassword(password);
    await pool.query('UPDATE "users" SET password = $1 WHERE email = $2', [
      newPassword,
      email,
    ]);
    const token = getSignToken(email);

    res.status(200).json({token});
  } catch (error) {
    console.error(error);
    res.status(500).json({error});
  }
}

//This is to test the linode server
// export async function test(req: Request, res: Response): Promise<any> {
//   console.log("RUNNING TEST");
//   return res.status(200).json({success: true});
// }
