var express = require("express");
const { default: indexController } = require("../controllers/index");
var router = express.Router();

/* GET home page. */
router.get("/", function (res) {
  res.send("asd");
});

module.exports = router;
