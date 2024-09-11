/*
DB setup for Seattle Traffic Events
*/

import pg from "pg";
import { error, log } from "console";

import { getDatabaseUri } from "./config/config.ts";

const { Client } = pg;
const databaseUri = getDatabaseUri();

const db = new Client({
  connectionString: databaseUri,
});

await db.connect();
log(`Connected to ${databaseUri}`);


export default db;