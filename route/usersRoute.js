const express = require("express")
const router = express.Router()

const userController = require("../controller/userController.js")

router.get("/:user_id", userController.getUserById)
router.post("/", userController.createUser)
router.post("/:user_id", userController.deleteUserById)
router.put("/:user_id", userController.updateUserById)
router.post("/login", userController.userLogIn);
router.post("/logout", userController.userLogout);

module.exports = router