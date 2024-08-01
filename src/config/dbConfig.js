import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

const executeQuery = async (query, values = []) => {
  const client = await pool.connect();
  try {
    const res = await client.query(query, values);
    return res.rows;
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
};

export { pool, executeQuery };
