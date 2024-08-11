const axios = require("axios");
require("dotenv").config();

const NEWS_KEY =
  process.env.NEXT_PUBLIC_NEWS_KEY || "513753a604764cbb8739a235d99f70c2";

const newsController = {
  getNews: async (req, res) => {
    const { category } = req.params;
    const apiURL = `https://newsapi.org/v2/everything?q=${category}&apiKey=${NEWS_KEY}`;

    try {
      const response = await axios.get(apiURL);

      res
        .status(200)
        .json({ statusCode: 200, message: "Success", data: response.data });
    } catch (error) {
      res.status(400).json({ statusCode: 400, message: error.message });
    }
  },
};
module.exports = newsController;
