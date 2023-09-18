"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccessToken = exports.authenticateToken = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
//const jwtSecret = process.env.JWT_SECRET || "";
const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcryptjs_1.default.hash(password, saltRounds);
};
exports.hashPassword = hashPassword;
const authenticateToken = () => {
    return (req, res, next) => {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return res.sendStatus(401);
        }
        jsonwebtoken_1.default.verify(token, config_1.config.refreshKey, (err, decoded) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.email = decoded.email;
            next();
        });
    };
};
exports.authenticateToken = authenticateToken;
const getAccessToken = (credentials) => jsonwebtoken_1.default.sign(credentials, config_1.config.accessKey, {
    expiresIn: "1h",
});
exports.getAccessToken = getAccessToken;
//# sourceMappingURL=authService.js.map