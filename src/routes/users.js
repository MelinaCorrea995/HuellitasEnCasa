var express = require('express');
var router = express.Router();
const { register, login, preAdopt } = require('../controllers/userController');


router.get("/register", register)
router.get("/login",login)
router.get("/preAdopt", preAdopt)
module.exports = router;
