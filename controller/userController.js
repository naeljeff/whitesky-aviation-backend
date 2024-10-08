const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const saltRounds = 10;
require("dotenv").config();

// Set up PostgreSQL client
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

pool.connect((err) => {
  if (err) throw err;
  console.log("Connect to database successfully!");
});

const userController = {
  getUserById: async (req, res) => {
    const userId = req.params.user_id;
    try {
      const { rows } = await pool.query(
        `SELECT * FROM users WHERE user_id = $1`,
        [userId]
      );

      if (rows.length === 1) {
        return res.status(200).json({
          statusCode: 200,
          message: "Data retrieved successfully",
          data: rows,
        });
      }

      res.status(404).json({ statusCode: 404, message: "User not found" });
    } catch (error) {
      res.status(400).json({ statusCode: 400, message: error.message });
    }
  },
  createUser: async (req, res) => {
    try {
      const { name, email, phone_number, password } = req.body;

      const hashed_password = await bcrypt.hash(password, saltRounds);

      const query =
        "INSERT INTO users (name, email, phone_number, password) VALUES ($1, $2, $3, $4) RETURNING *";

      const { rows } = await pool.query(query, [
        name,
        email,
        phone_number,
        hashed_password,
      ]);

      res.status(201).json({
        statusCode: 201,
        message: "User created successfully",
        data: rows,
      });
    } catch (error) {
      res.status(400).json({ statusCode: 400, message: error.message });
    }
  },
  updateUserById: async (req, res) => {
    try {
      const userId = req.params.user_id;
      const { name, email, phone_number, password } = req.body;

      const hashed_password = await bcrypt.hash(password, saltRounds);

      const query =
        "UPDATE users SET name = $1, email = $2, phone_number = $3, password = $4 WHERE user_id = $5 RETURNING *";

      const { rows } = await pool.query(query, [
        name,
        email,
        phone_number,
        hashed_password,
        userId,
      ]);

      if (rows.length === 0) {
        return res.status(404).json({
          statusCode: 404,
          message: "User not found",
        });
      }

      res.status(200).json({
        statusCode: 200,
        message: "User updated successfully",
        data: rows[0],
      });
    } catch (error) {
      res.status(400).json({ statusCode: 400, message: error.message });
    }
  },
  userLogIn: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Query to authenticate user
      const authUser = "SELECT * FROM users WHERE email = $1";
      console.log("Executing Query:", authUser, [email]);
      const { rows } = await pool.query(authUser, [email]);

      if (rows.length === 0) {
        return res
          .status(401)
          .json({ statusCode: 401, message: "Invalid email or password" });
      }

      const user = rows[0];
      const matchPassword = await bcrypt.compare(password, user.password);

      if (!matchPassword) {
        return res
          .status(401)
          .json({ statusCode: 401, message: "Invalid email or password" });
      }

      // Update user status
      const updateUserStatus =
        "UPDATE users SET status = 'logged in' WHERE user_id = $1 RETURNING *";
      console.log("Updating User Status Query:", updateUserStatus, [
        user.user_id,
      ]);
      const updatedUser = await pool.query(updateUserStatus, [user.user_id]);

      res.status(200).json({
        statusCode: 200,
        message: "User logged in successfully",
        data: updatedUser.rows[0],
      });
    } catch (error) {
      // Log the error
      res.status(400).json({ statusCode: 400, message: error.message });
    }
  },
  userLogout: async (req, res) => {
    try {
      const { user_id } = req.body;

      // Update status user ke not logged in
      const updateUserStatus =
        "UPDATE users SET status = 'not logged in' WHERE user_id = $1 RETURNING *";
      const updatedUser = await pool.query(updateUserStatus, [user_id]);

      res.status(200).json({
        statusCode: 200,
        message: "User logged out successfully",
        data: updatedUser.rows[0],
      });
    } catch (error) {
      res.status(400).json({ statusCode: 400, message: error.message });
    }
  },
  deleteUserById: async (req, res) => {
    try {
      const userId = req.params.user_id;
      const deleteUser = "DELETE FROM users WHERE user_id = $1 RETURNING *";

      const { rows } = await pool.query(deleteUser, [userId]);

      if (rows.length === 0) {
        return res.status(404).json({
          statusCode: 404,
          message: "User not found",
        });
      }

      return res.status(200).json({
        statusCode: 200,
        message: "User has been deleted successfully",
        data: rows[0],
      });
    } catch (error) {
      res.status(400).json({ statusCode: 400, message: error.message });
    }
  },
};

module.exports = userController;
