import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import type { StoredLead } from "@/lib/leadValidation";

let database: Database.Database | null = null;

function getDatabasePath() {
  const configuredPath = process.env.SQLITE_DB_PATH ?? "./data/leads.sqlite";

  return path.isAbsolute(configuredPath)
    ? configuredPath
    : path.join(process.cwd(), configuredPath);
}

function getDatabase() {
  if (database) {
    return database;
  }

  const databasePath = getDatabasePath();
  fs.mkdirSync(path.dirname(databasePath), { recursive: true });

  database = new Database(databasePath);
  database.pragma("journal_mode = WAL");
  database
    .prepare(
      `
      CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created_at TEXT NOT NULL,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        service TEXT NOT NULL,
        radius TEXT NOT NULL,
        preferred_time TEXT NOT NULL,
        comment TEXT,
        page TEXT,
        source TEXT,
        ip TEXT
      )
    `,
    )
    .run();

  return database;
}

export function saveLead(lead: StoredLead) {
  const db = getDatabase();
  const statement = db.prepare(
    `
    INSERT INTO leads (
      created_at,
      name,
      phone,
      service,
      radius,
      preferred_time,
      comment,
      page,
      source,
      ip
    )
    VALUES (
      @createdAt,
      @name,
      @phone,
      @service,
      @radius,
      @preferredTime,
      @comment,
      @page,
      @source,
      @ip
    )
  `,
  );

  const result = statement.run(lead);

  return Number(result.lastInsertRowid);
}
