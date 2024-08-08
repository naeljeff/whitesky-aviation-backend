require("dotenv").config();

export const authenticate = (req, res, next) => {
  const secretKey = req.body.key_id;
  if (secretKey !== process.env.SECRET_KEY_ID) {
    return res.status(400).json({ message: "Invalid or missing secret key" });
  }
  next();
};
