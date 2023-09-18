import {Router} from "express";
//import {config} from "../config";
import {authenticateToken} from "../services/authService";
const router = Router();

router.get("/validate", authenticateToken(), (req, res) => {
  res.json({response: res});
});

export default router;
