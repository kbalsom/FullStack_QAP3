// NOTE: SAT Nov 26 This file not needed, maybe?

const express = require("express");
const router = express.Router();
const moviesDal = require("../services/movies.dal");

router.get("/", async (req, res) => {
  try {
    let theMovies = await moviesDal.getMovies(); // from Mongo not from postgresql
    // res.json(theAwards); // this will display my json data in full
    res.render("movies", { theMovies });
  } catch {
    res.render("503");
  }
});

module.exports = router;
