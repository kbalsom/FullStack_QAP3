const express = require("express");
const router = express.Router();
const { postMovie } = require("../services/newmovie.dal");

router.get("/", async (req, res) => {
  res.render("newmovie");
});

router.post("/", async (req, res) => {
  var addMovie = await postMovie(req.body);
  DEBUG && console.log(addMovie);
  if (addMovie[0] != undefined) {
    res.render("newmovie", { addMovie });
  } else {
    let message = "Invalid user email. Please try again.";
    res.render("newmovie", { message });
  }
});

module.exports = router;
