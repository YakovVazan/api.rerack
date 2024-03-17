/********************************  
the DB is hosted on https://freedb.tech/
available on https://phpmyadmin.freedb.tech/index.php
 ********************************/

import mysql from 'mysql2'

const pool = mysql.createPool({
  host: 'sql.freedb.tech',
  user: 'freedb_YkvVzn',
  password: 'jnY29TaN%QDWhca',
  database: 'freedb_Rerack',
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
