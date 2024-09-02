
const express = require("express");


const { userLogin, userRegister, userCurrent } = require("../controllers/userController");

const router = express.Router();
const validateToken=require("../middleware/validateTokenHnadler")
router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/current",validateToken, userCurrent);

module.exports = router;
