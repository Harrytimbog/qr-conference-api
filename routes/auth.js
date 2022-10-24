const { Router } = require("express");
const express = require("express");

const route = express.Router();

const { login, register } = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);

module.exports = router;
