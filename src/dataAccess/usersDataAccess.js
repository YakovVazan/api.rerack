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
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT * FROM users WHERE ${factor}  = ?`,
      [identifier],
      (err, row) => {
        if (err || !row) {
          reject(err);
        } else {
          resolve(row);
        }
      }
    );
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
