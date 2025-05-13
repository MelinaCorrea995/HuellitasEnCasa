var express = require('express');
var router = express.Router();
const {index, aboutUs, admin} = require("../controllers/indexController")
/* GET home page. */
router.get('/', index);

// router.get("/about",aboutUs)
router.get("/about",aboutUs)

// router.get("/admin",aboutUs)
router.get("/admin",admin)


module.exports = router;
