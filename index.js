const express = require("express");
const userRoutes = require("./route/userRoutes.js");
const authenticate = require("./middleware/authenticate.js");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use("api/v1/users", authenticate, userRoutes);

app.post("api/v1/login", userRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
