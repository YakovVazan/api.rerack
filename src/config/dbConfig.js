/********************************  
the DB is hosted on https://freedb.tech/
available on https://phpmyadmin.freedb.tech/index.php
 ********************************/

import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0
});

const executeQuery = async (query, values = []) => {
  return new Promise((resolve, reject) => {
    pool.query(query, values, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
};

export default { pool, executeQuery };
