var express = require('express');
var router = express.Router();
const {index, aboutUs} = require("../controllers/indexController")
/* GET home page. */
router.get('/', index);
router.get("/aboutUs",aboutUs)

module.exports = router;
