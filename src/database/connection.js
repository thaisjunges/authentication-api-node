import pg from "pg";
import dotenv from "dotenv";
import 'dotenv/config'

dotenv.config({ path: "../.env" });

const pool = new pg.Pool({
  connectionString: String(process.env.DATABASE_URL),
});

export default pool;