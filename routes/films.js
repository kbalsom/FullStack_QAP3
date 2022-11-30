const express = require("express");
const router = express.Router();
// const actorsDal = require('../services/pg.actors.dal')
const filmsDal = require("../services/m.films.dal");

router.get("/", async (req, res) => {
  // const theActors = [
  //     {first_name: 'Youn', last_name: 'Yuh-jung'},
  //     {first_name: 'Laura', last_name: 'Dern'},
  //     {first_name: 'Regina', last_name: 'King'}
  // ];
  try {
    let theFilms = await filmsDal.getFilms();
    if (DEBUG) console.table(theFilms);
    res.render("films", { theFilms });
  } catch {
    res.render("503");
  }
});

router.get("/:id", async (req, res) => {
  // const anActor = [
  //     {first_name: 'Regina', last_name: 'King'}
  // ];
  try {
    let film = await filmsDal.getFilmByFilmId(req.params.id);
    if (film.length === 0) res.render("norecord");
    else res.render("film", { film });
  } catch {
    res.render("503");
  }
});

router.get("/:id/replace", async (req, res) => {
  if (DEBUG) console.log("film.Replace : " + req.params.id);
  res.render("filmPut.ejs", {
    title: req.query.title,
    year: req.query.year,
    theId: req.params.id,
  });
});

router.get("/:id/edit", async (req, res) => {
  if (DEBUG) console.log("film.Edit : " + req.params.id);
  res.render("filmPatch.ejs", {
    title: req.query.title,
    year: req.query.year,
    theId: req.params.id,
  });
});

router.get("/:id/delete", async (req, res) => {
  if (DEBUG) console.log("film.Delete : " + req.params.id);
  res.render("filmDelete.ejs", {
    title: req.query.title,
    year: req.query.year,
    theId: req.params.id,
  });
});

router.post("/", async (req, res) => {
  if (DEBUG) console.log("film.POST");
  try {
    await filmsDal.addFilm(req.body.title, req.body.year);
    res.redirect("/films/");
  } catch {
    // log this error to an error log file.
    res.render("503");
  }
});

// PUT, PATCH, and DELETE are part of HTTP, not a part of HTML
// Therefore, <form method="PUT" ...> doesn't work, but it does work for RESTful API

router.put("/:id", async (req, res) => {
  if (DEBUG) console.log("films.PUT: " + req.params.id);
  try {
    await filmsDal.putFilm(req.params.id, req.body.title, req.body.year);
    res.redirect("/films/");
  } catch {
    // log this error to an error log file.
    res.render("503");
  }
});
router.patch("/:id", async (req, res) => {
  if (DEBUG) console.log("films.PATCH: " + req.params.id);
  try {
    await filmsDal.patchFilm(req.params.id, req.body.title, req.body.year);
    res.redirect("/films/");
  } catch {
    // log this error to an error log file.
    res.render("503");
  }
});
router.delete("/:id", async (req, res) => {
  if (DEBUG) console.log("films.DELETE: " + req.params.id);
  try {
    await filmsDal.deleteFilm(req.params.id);
    res.redirect("/films/");
  } catch {
    // log this error to an error log file.
    res.render("503");
  }
});

module.exports = router;
