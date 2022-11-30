var router = require("express").Router();

if (DEBUG) {
  console.log("ROUTE: /api/films");
}

const filmsRouter = require("./films");
router.use("/films", filmsRouter);

module.exports = router;
