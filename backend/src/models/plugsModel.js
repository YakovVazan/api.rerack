import sqlite3 from "sqlite3";

const sqlite = sqlite3.verbose();
const db = new sqlite.Database(
  "backend/src/db/data.db",
  sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE
);

class Plug {
  constructor(company, name, src, type) {
    this.company = company;
    this.name = name;
    this.src = src;
    this.type = type;
  }
}

const createPlug = (company, name, src, type) => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO plugins (company, name, src, type) VALUES (?, ?, ?, ?)",
      [company, name, src, type],
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

const getAllPlugs = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM plugins", (err, rows) => {
      if (err) {
        reject(err);
      } else resolve(rows);
    });
  });
};

export default { getAllPlugs, createPlug };
