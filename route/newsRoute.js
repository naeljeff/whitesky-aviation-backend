const express = require("express")
const router = express.Router()

const newsController = require("../controller/newsController.js")

router.post("/:category", newsController.getNews)

module.exports = router