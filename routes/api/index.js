var router = require("express").Router();

if (DEBUG) {
  console.log("ROUTE: /api/movies");
}

router.use("/movies", require("./movies"));

module.exports = router;
