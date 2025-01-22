const User = require("../models/user");
const express = require("express");
const { Router } = express;
const router = Router();
const {signUp} = require("../controllers/user")
const {login} = require("../controllers/user")

router.post("/register", signUp);
router.post("/login", login)


module.exports = router;
