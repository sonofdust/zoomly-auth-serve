import {Pool, QueryResult} from "pg";
import {config} from "./config";
const {user, host, database, password} = config;
const port: number = <number>(<unknown>config.db_port);

const pool = new Pool({
  user,
  host,
  database,
  password,
  port,
});
const closePool = () => {
  pool.end().then(() => console.log("Database pool closed."));
};
export {pool, QueryResult, closePool};
