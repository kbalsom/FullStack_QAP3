const express = require("express");
const router = express.Router();
const { postMovie } = require("../services/newmovie.dal");

router.get("/", async (req, res) => {
  res.render("newmovie");
});

router.post("/", async (req, res) => {
  var addMovie = await postMovie(req.body);
  DEBUG && console.log(addMovie, "here");
  res.render("newmovie", { addMovie });
});

module.exports = router;
