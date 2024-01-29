import sqlite3 from "sqlite3";
import path from "path";

const dbPath = path.resolve("\src"+"/db/data.db");

const sqliteInstance = sqlite3.verbose();
const db = new sqliteInstance.Database(
  dbPath,
  sqliteInstance.OPEN_READWRITE | sqliteInstance.OPEN_CREATE,
  (err) => {
    if (err) {
      return console.error(err.message);
    }

    db.run(
      `
      CREATE TABLE IF NOT EXISTS plugins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        company TEXT NOT NULL,
        name TEXT NOT NULL,
        src TEXT NOT NULL,
        type TEXT DEFAULT 'Unknown'
      )
    `,
      (err) => {
        if (err) {
          console.error("Error creating table:", err.message);
        } else {
          console.log(
            "Table 'plugins' created successfully or already exists."
          );
        }
      }
    );
  }
);

export default db;
