import dotenv from "dotenv";

dotenv.config();

export const config = {
  accessKey: process.env.JWT_SECRET ?? "",
  refreshKey: process.env.JWT_REFRESH ?? "",
  apiKey: process.env.API_KEY ?? "",
  port: process.env.PORT ?? "",
  //Database connection values
  user: process.env.DB_USER ?? "",
  host: process.env.DB_HOST ?? "",
  database: process.env.DB_NAME ?? "",
  password: process.env.DB_PASSWORD ?? "",
  db_port: process.env.DB_PORT ?? "",
  //OpenAI key
  openApiKey: process.env.OPENAI_API_KEY ?? "",
};
