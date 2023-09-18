import {Router} from "express";
//import {config} from "../config";
import {authenticateToken} from "../services/authService";
import {Response, Request} from "express";
const router = Router();

router.get("/", authenticateToken(), (req: Request, res: Response) => {
  return res.status(200).json({success: true});
});
export default router;
