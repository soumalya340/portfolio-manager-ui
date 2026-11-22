// Applies db/schema.sql to the Neon database in DATABASE_URL.
// Usage: node --env-file=.env.local db/migrate.mjs
import { readFile } from "node:fs/promises";
import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set. Run with --env-file=.env.local, or pull it with `vercel env pull`.");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const schema = await readFile(new URL("./schema.sql", import.meta.url), "utf8");
const statements = schema
  .split(/;\s*$/m)
  .map((statement) => statement.replace(/^\s*--.*$/gm, "").trim())
  .filter(Boolean);

for (const statement of statements) {
  await sql.query(statement);
}
console.log(`Applied ${statements.length} statements from db/schema.sql`);
