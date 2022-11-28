var router = require("express").Router();

if (DEBUG) {
  console.log("ROUTE: /api/awards");
}

router.use("/awards", require("./awards"));

module.exports = router;
