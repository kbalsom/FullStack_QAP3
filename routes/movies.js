// NOTE: SAT Nov 26 This file not needed, maybe?

const express = require("express");
const router = express.Router();
const moviesDal = require("../services/m.movies.dal");

router.get("/", async (req, res) => {
  try {
    let theMovies = await moviesDal.getFilms();
    res.render("movies", { theMovies });
  } catch {
    res.render("503");
  }
});

module.exports = router;
