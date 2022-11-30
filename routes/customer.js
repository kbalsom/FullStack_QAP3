const express = require("express");
const router = express.Router();
// const actorsDal = require('../services/pg.actors.dal')
const custDal = require("../services/m.cust.dal");

router.get("/", async (req, res) => {
  // const theActors = [
  //     {first_name: 'Youn', last_name: 'Yuh-jung'},
  //     {first_name: 'Laura', last_name: 'Dern'},
  //     {first_name: 'Regina', last_name: 'King'}
  // ];
  try {
    let theFilms = await custDal.getAllFilms();
    if (DEBUG) console.table(theFilms);
    res.render("customer", { theFilms });
  } catch {
    res.render("503");
  }
});

module.exports = router;
