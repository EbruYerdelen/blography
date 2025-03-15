const express = require("express");
const { registerUser, loginUser, updatePassword, deleteUserAccount } = require("./auth.controller");
const authMiddleware = require("../../middlewares/auth-middleware");
const router = express.Router();

router.post("/register", registerUser)
router.post("/login", loginUser)

router.put("/update-password", authMiddleware, updatePassword)
router.delete("/delete-account",authMiddleware,deleteUserAccount)

module.exports = router