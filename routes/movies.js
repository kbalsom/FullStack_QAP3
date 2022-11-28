// NOTE: SAT Nov 26 This file not needed, maybe?

const express = require("express");
const router = express.Router();
const awardsDal = require("../services/awards.dal");

router.get("/", async (req, res) => {
  try {
    let theAwards = await awardsDal.getAwards(); // from Mongo not from postgresql
    // res.json(theAwards); // this will display my json data in full
    res.render("awards", { theAwards });
  } catch {
    res.render("503");
  }
});

module.exports = router;
