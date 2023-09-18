"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.change_password = exports.signup = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const authService_1 = require("../services/authService");
const database_1 = require("../database");
async function login(req, res) {
    const { email, password } = req.body;
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
            const token = (0, authService_1.getSignToken)(user.id);
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
async function signup(req, res) {
    const { email, password } = req.body;
    try {
        // Check if user already exists
        const userExists = await database_1.pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Hash the password
        const hashedPassword = await (0, authService_1.hashPassword)(password);
        // Create the new user
        const newUser = await database_1.pool.query("INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *", [email, hashedPassword]);
        // Generate JWT token
        const token = (0, authService_1.generateToken)({ email });
        // Return the newly created user and token
        return res.status(201).json({ user: newUser.rows[0], token });
    }
    catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Server error" });
    }
}
exports.signup = signup;
async function change_password(req, res) {
    try {
        const { email, password } = req.body;
        // Validate the input (e.g., check newPassword length, etc.)
        // Update the user password
        const newPassword = await (0, authService_1.hashPassword)(password);
        await database_1.pool.query('UPDATE "users" SET password = $1 WHERE email = $2', [
            newPassword,
            email,
        ]);
        const token = (0, authService_1.getSignToken)(email);
        res.status(200).json({ token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}
exports.change_password = change_password;
//This is to test the linode server
// export async function test(req: Request, res: Response): Promise<any> {
//   console.log("RUNNING TEST");
//   return res.status(200).json({success: true});
// }
//# sourceMappingURL=userController.js.map