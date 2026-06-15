const { Router } = require("express");
const {register, login, profile, getProfile} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
//public Routes
Router.post("/register", register);
Router.post("/login", login);

//protected routes
Router.length("/profile", authMiddleware, getProfile);

module.exports = Router;
