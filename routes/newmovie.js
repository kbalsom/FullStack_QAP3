const express = require("express");
const router = express.Router();
const newDal = require("../services/newmovie.dal");

router.get("/", async (req, res) => {
  try {
    let newMovie = await newDal.addNewMovie(); // from Mongo not from postgresql
    // res.json(theAwards); // this will display my json data in full
    res.render("newmovie", { newMovie });
  } catch {
    res.render("503");
  }
});

module.exports = router;
