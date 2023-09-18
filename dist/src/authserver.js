"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const body_parser_1 = __importDefault(require("body-parser"));
const config_1 = require("./config");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
//********************** CORS ************************************/
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, DELETE"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   next();
// });
//********************** CORS ************************************/
const corsOptions = {
    origin: `http://localhost:3000`,
    methods: "GET,POST,PUT,DELETE",
    optionsSuccessStatus: 204, // Set the response status for preflight requests to 204
};
app.use((0, cors_1.default)(corsOptions));
//****************************************************************/
app.use(body_parser_1.default.json());
// Other middleware and configurations
app.use(express_1.default.json());
// Login and Accounts
app.use("/user", userRoutes_1.default);
// Testing the route.
//app.use("/user/test", userRoutes);
// Close the database connection pool on application shutdown
// process.on("SIGINT", () => {
//   closePool();
//   process.exit(0);
// });
// process.on("SIGTERM", () => {
//   closePool();
//   process.exit(0);
// });
const port = config_1.config.port || 4001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//∂export default app;
//# sourceMappingURL=authserver.js.map