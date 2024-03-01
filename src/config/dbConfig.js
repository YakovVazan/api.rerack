/********************************  
the DB is hosted on https://www.freemysqlhosting.net/
 ********************************/

import mysql from 'mysql2'

const pool = mysql.createPool({
  host: 'sql8.freemysqlhosting.net',
  user: 'sql8687586',
  password: 'irxtmXVJak',
  database: 'sql8687586',
  waitForConnections: true,
  connectionLimit: 10,
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
