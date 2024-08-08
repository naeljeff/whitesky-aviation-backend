import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("Starting server...");
})

app.listen(5000)