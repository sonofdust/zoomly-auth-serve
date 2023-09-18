import express from "express";
import userRoutes from "./routes/userRoutes";
import autoRoutes from "./routes/authRoutes";
import openAIRoutes from "./routes/openAIRoutes";
import logedInRoutes from "./routes/logedInRoute";
import {closePool} from "./database";
import bodyParser from "body-parser";
import {config} from "./config";
import cors from "cors";
const app = express();

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
  origin: `http://localhost:5173`, // Allow requests from this origin
  methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
  optionsSuccessStatus: 204, // Set the response status for preflight requests to 204
};
app.use(cors(corsOptions));
//****************************************************************/

app.use(bodyParser.json());
// Other middleware and configurations
app.use(express.json());
// Login and Accounts
app.use("/user", userRoutes);
app.use("/user/signup", userRoutes);
app.use("/user/change-password", userRoutes);
// Testing the route.
//app.use("/user/test", userRoutes);

// Companies
app.use("/auto", autoRoutes);
// OpenAI
app.use("/openai", openAIRoutes);
app.use("/validate", logedInRoutes);
// Close the database connection pool on application shutdown
// process.on("SIGINT", () => {
//   closePool();
//   process.exit(0);
// });

// process.on("SIGTERM", () => {
//   closePool();
//   process.exit(0);
// });
const port = config.port || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//∂export default app;
