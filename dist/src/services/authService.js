"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSignToken = exports.authenticateToken = exports.generateToken = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
//const jwtSecret = process.env.JWT_SECRET || "";
const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcryptjs_1.default.hash(password, saltRounds);
};
exports.hashPassword = hashPassword;
const generateToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, config_1.config.secretKey, { expiresIn: "2h" });
};
exports.generateToken = generateToken;
const authenticateToken = () => {
    return (req, res, next) => {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return res.sendStatus(401);
        }
        jsonwebtoken_1.default.verify(token, config_1.config.secretKey, (err, decoded) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.email = decoded.email;
            next();
        });
    };
};
exports.authenticateToken = authenticateToken;
const getSignToken = (email) => jsonwebtoken_1.default.sign({ userId: email }, config_1.config.secretKey, {
    expiresIn: "1h",
});
exports.getSignToken = getSignToken;
//# sourceMappingURL=authService.js.map