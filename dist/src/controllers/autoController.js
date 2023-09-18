"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAutoMakers = void 0;
const database_1 = require("../database");
async function getAutoMakers(req, res) {
    try {
        const autoCompanies = await database_1.pool.query("SELECT * FROM auto_companies");
        //    closePool();
        if (autoCompanies.rows.length > 0) {
            return res.status(201).json(autoCompanies.rows);
        }
        else {
            return res.status(500).json({ message: "Empty table." });
        }
    }
    catch (e) {
        return res.status(500).json({ error: "Error" });
    }
}
exports.getAutoMakers = getAutoMakers;
//# sourceMappingURL=autoController.js.map