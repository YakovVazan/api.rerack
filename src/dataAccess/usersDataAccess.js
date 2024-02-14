import db from "../config/dbConfig.js";

const insertNewUser = (email, name, hash) => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO users (email, name, hash) VALUES (?, ?, ?)",
      [email, name, hash],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({ email, name, hash });
        }
      }
    );
  });
};

const selectUser = (factor, identifier) => {
  const query = `SELECT * FROM users WHERE ${factor}  = ?`;

  return new Promise((resolve, reject) => {
    db.get(query, [identifier], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

const selectAllUsers = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM users", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

export { insertNewUser, selectUser, selectAllUsers };
