"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//import {config} from "../config";
const authService_1 = require("../services/authService");
const router = (0, express_1.Router)();
router.get("/validate", (0, authService_1.authenticateToken)(), (req, res) => {
    res.json({ response: res });
});
exports.default = router;
//# sourceMappingURL=authRoutes.js.map