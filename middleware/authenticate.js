require("dotenv").config();

const authenticate = (req, res, next) => {
  const secretKey = req.body.key_id;
  if (secretKey !== process.env.SECRET_KEY_ID) {
    return res.status(403).json({ statusCode: 403, message: "Invalid or missing secret key" });
  }
  next();
};

module.exports = authenticate;