"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const authService_1 = require("../services/authService");
const database_1 = require("../database");
async function login(req, res) {
    const { email, password } = req.body;
    return res.status(200).json({ email, password });
    try {
        // Fetch user data from the database based on the email
        const result = await database_1.pool.query('SELECT * FROM "users" WHERE email = $1', [
            email,
        ]);
        const user = result.rows[0];
        // If no user found, handle the appropriate response
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        // Compare the plaintext password with the stored encrypted password
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        // If the passwords match, authentication is successful
        if (isMatch) {
            // Perform further actions, such as generating a JWT token or setting session data
            const token = (0, authService_1.getAccessToken)({ email, password });
            return res.status(200).json({ token });
        }
        // If the passwords don't match, handle the appropriate response
        return res.status(401).json({ message: "Invalid password" });
    }
    catch (error) {
        // Handle any errors that occur during the login process
        console.error("Error logging in:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
exports.login = login;
//# sourceMappingURL=userController.js.map