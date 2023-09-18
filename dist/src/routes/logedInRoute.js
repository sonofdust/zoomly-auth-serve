"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//import {config} from "../config";
const authService_1 = require("../services/authService");
const router = (0, express_1.Router)();
router.get("/", 
//  authenticateToken(config.secretKey),
(0, authService_1.authenticateToken)(), (req, res) => {
    return res.status(200).json({ success: true });
});
exports.default = router;
//# sourceMappingURL=logedInRoute.js.map