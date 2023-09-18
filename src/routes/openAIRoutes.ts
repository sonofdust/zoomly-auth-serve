import {Router} from "express";
// import {config} from "../config";
import {authenticateToken} from "../services/authService";
import getOpenAI from "../controllers/openAIController";
const router = Router();

//router.post("/", authenticateToken(config.secretKey), getOpenAI);
router.post("/", authenticateToken(), getOpenAI);

export default router;
