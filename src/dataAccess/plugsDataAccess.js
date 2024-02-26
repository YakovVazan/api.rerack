import db from "../config/dbConfig.js";

const insertNewPlug = (company, name, src, type, userId) => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO plugins (company, name, src, type, userId) VALUES (?, ?, ?, ?, ?)",
      [company, name, src, type, userId],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({ company, name, src, type });
        }
      }
    );
  });
};

const selectAllPlugs = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM plugins", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const alterPlug = (id, company, name, src, type, userId) => {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE plugins SET company = ?, name = ?, src = ?, type = ?, userId = ? WHERE id =?",
      [company, name, src, type, userId, id],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({ company, name, src, type });
        }
      }
    );
  });
}

const dropPlug = (id) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM plugins WHERE id = ?", [id], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve({ id });
      }
    });
  });
}

export { insertNewPlug, selectAllPlugs, alterPlug, dropPlug };
