"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
//import {authenticateToken} from "../services/authService";
// import {config} from "../config";
const router = (0, express_1.Router)();
router.post("/login", userController_1.login);
// router.post("/signup", signup);
// router.put("/change-password", authenticateToken(), change_password);
//router.get("/test", test);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map