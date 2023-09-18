"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import {config} from "../config";
const authService_1 = require("../services/authService");
const openAIController_1 = __importDefault(require("../controllers/openAIController"));
const router = (0, express_1.Router)();
//router.post("/", authenticateToken(config.secretKey), getOpenAI);
router.post("/", (0, authService_1.authenticateToken)(), openAIController_1.default);
exports.default = router;
//# sourceMappingURL=openAIRoutes.js.map