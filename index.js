const express = require("express");
const userRoutes = require("./route/usersRoute.js");
const authenticate = require("./middleware/authenticate.js");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/api/v1/users", authenticate, userRoutes);

app.use("/api/v1", userRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});