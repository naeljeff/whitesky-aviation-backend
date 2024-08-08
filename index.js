const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();
const authenticate = require("./middleware/authenticate.js");

const app = express();
app.use(express.json());

// Set up PostgreSQL client
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

app.get("/", authenticate, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
