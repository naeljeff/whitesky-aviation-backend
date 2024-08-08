const express = require("express");
const userRoutes = require("./route/usersRoute.js");
require("dotenv").config();
const authenticate = require("./middleware/authenticate.js");

const app = express();
app.use(express.json());

app.use("api/v1/users", authenticate, userRoutes);

app.post("api/v1/login", userRoutes.login);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
