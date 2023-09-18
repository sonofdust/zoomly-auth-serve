import {Request, Response} from "express";
import {pool, closePool} from "../database";

export async function getAutoMakers(req: Request, res: Response) {
  try {
    const autoCompanies = await pool.query("SELECT * FROM auto_companies");
    //    closePool();
    if (autoCompanies.rows.length > 0) {
      return res.status(201).json(autoCompanies.rows);
    } else {
      return res.status(500).json({message: "Empty table."});
    }
  } catch (e) {
    return res.status(500).json({error: "Error"});
  }
}
