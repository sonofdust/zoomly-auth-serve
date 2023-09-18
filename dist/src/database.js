"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closePool = exports.pool = void 0;
const pg_1 = require("pg");
const config_1 = require("./config");
const { user, host, database, password } = config_1.config;
const port = config_1.config.db_port;
const pool = new pg_1.Pool({
    user,
    host,
    database,
    password,
    port,
});
exports.pool = pool;
const closePool = () => {
    pool.end().then(() => console.log("Database pool closed."));
};
exports.closePool = closePool;
//# sourceMappingURL=database.js.map