
const express = require("express");


const { userLogin, userRegister, userCurrent } = require("../controllers/userController");

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/current", userCurrent);

module.exports = router;
