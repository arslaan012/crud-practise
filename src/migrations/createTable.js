const fs = require("fs");
const path = require("path");
const pool = require("../config/dbConfig");

const schemaDir = path.join(__dirname, "../schemas");

async function runMigration() {
  try {
    const files = fs.readdirSync(schemaDir).filter(f => f.endsWith(".sql"));

    for (const file of files) {
      const filePath = path.join(schemaDir, file);
      const sql = fs.readFileSync(filePath, "utf8");
      
      console.log(`Running schema: ${file}`);
      await pool.query(sql);
    }

    console.log("All tables created successfully");
  } catch (err) {
    console.error("Migration failed:", err.message);
  } finally {
    pool.end();
  }
}

runMigration();
