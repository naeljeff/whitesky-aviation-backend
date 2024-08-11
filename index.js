const express = require("express");
const cors = require("cors"); 
const userRoutes = require("./route/usersRoute.js");
const newsRoutes = require("./route/newsRoute.js");
const authenticate = require("./middleware/authenticate.js");
require("dotenv").config();

const app = express();

app.use(cors({
  origin: "*", 
  methods: "*", 
  allowedHeaders: "*", 
}));

app.use(express.json());

app.use("/api/v1/users", authenticate, userRoutes);
app.use("/api/v1/news", newsRoutes)

const port = process.env.PORT || 3030;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});