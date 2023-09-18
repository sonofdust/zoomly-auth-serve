import {Router} from "express";
import {getAutoMakers} from "../controllers/autoController";
//import {config} from "../config";
import {authenticateToken} from "../services/authService";
const router = Router();

// router.get("/", authenticateToken(config.secretKey), getAutoMakers);
// router.get("/validate", authenticateToken(config.secretKey), (req, res) => {
router.get("/", authenticateToken(), getAutoMakers);
router.get("/validate", authenticateToken(), (req, res) => {
  res.json({response: res});
});

export default router;
