"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.createUser = exports.loginUser = void 0;
const database_1 = require("../database");
async function loginUser(email, password) {
    const query = "SELECT * FROM users WHERE email = $1 AND password = $2";
    const values = [email, password];
    const result = await database_1.pool.query(query, values);
    if (result.rows.length === 1) {
        return result.rows[0];
    }
    return null;
}
exports.loginUser = loginUser;
async function createUser(email, password) {
    const query = "SELECT * FROM users WHERE email = $1 AND password = $2";
    const values = [email, password];
    const result = await database_1.pool.query(query, values);
    if (result.rows.length === 1) {
        return result.rows[0];
    }
    return null;
}
exports.createUser = createUser;
async function updatePassword(email, password) {
    const query = "SELECT * FROM users WHERE email = $1";
    const values = [email, password];
    //  console.log("VALUES", values);
    const result = await database_1.pool.query(query, values);
    // console.log("RESULT", result.rows[0]);
    if (result.rows.length === 1) {
        return result.rows[0];
    }
    return null;
}
exports.updatePassword = updatePassword;
//# sourceMappingURL=userService.js.map