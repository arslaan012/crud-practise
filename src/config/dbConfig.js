const { Pool } = require("pg")
require("dotenv").config()

const pool = new Pool({
    user: process.env.PG_USER || "postgres",
    host: process.env.PG_HOST || "db",
    database: process.env.PG_DATABASE || "mydb",
    password: process.env.PG_PASSWORD || "postgres",
    port: process.env.PG_PORT || 5432,
});

pool.connect().then( () => console.log("Database connected"))
.catch(err => console.log("Database not connected", err))

module.exports = pool;