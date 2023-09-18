import {QueryResult} from "pg";
import {pool} from "../database";
import {User} from "../models/user";

export async function loginUser(
  email: string,
  password: string
): Promise<User | null> {
  const query = "SELECT * FROM users WHERE email = $1 AND password = $2";
  const values = [email, password];
  const result: QueryResult = await pool.query(query, values);
  if (result.rows.length === 1) {
    return result.rows[0] as User;
  }
  return null;
}

export async function createUser(
  email: string,
  password: string
): Promise<User | null> {
  const query = "SELECT * FROM users WHERE email = $1 AND password = $2";
  const values = [email, password];

  const result: QueryResult = await pool.query(query, values);
  if (result.rows.length === 1) {
    return result.rows[0] as User;
  }
  return null;
}

export async function updatePassword(
  email: string,
  password: string
): Promise<User | null> {
  const query = "SELECT * FROM users WHERE email = $1";
  const values = [email, password];
  //  console.log("VALUES", values);
  const result: QueryResult = await pool.query(query, values);
  // console.log("RESULT", result.rows[0]);

  if (result.rows.length === 1) {
    return result.rows[0] as User;
  }
  return null;
}
