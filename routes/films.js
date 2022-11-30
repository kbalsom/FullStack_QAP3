const express = require("express");
const router = express.Router();
// const actorsDal = require('../services/pg.actors.dal')
const filmsDal = require("../services/m.films.dal");
const http = require("http");
const EventEmitter = require("events"); //Imports the global events module, and assigns it to the constant EventEmiter.
class MyEmitter extends EventEmitter {} //Creates a class MyEmitter, that inherits the properties of EventEmiiter.
const myEmitter = new MyEmitter();
const logger = require("../logger.js"); //Imports the logger.js file, and assigns it to the constant logger. This allows any modules exported there to be used here.

logger.fileOps();
myEmitter.addListener("status", (msg) => {
  console.log(msg);
  logger.addToFile(msg);
});

router.get("/", async (req, res) => {
  try {
    let theFilms = await filmsDal.getFilms();
    if (DEBUG) console.table(theFilms);
    res.render("films", { theFilms });
  } catch {
    res.statusCode(503).res.render("503");
    myEmitter.emit("status", `Status Code: ${res.statusCode}`);
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
    res.statusCode(503).res.render("503");
    myEmitter.emit("status", `Status Code: ${res.statusCode}`);
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
  if (DEBUG) console.log("films.POST");
  try {
    await filmsDal.addFilm(req.body.title, req.body.year);
    res.redirect("/films/");
  } catch {
    res.statusCode(503).res.render("503");
    myEmitter.emit("status", `Status Code: ${res.statusCode}`);
  }
});

router.put("/:id", async (req, res) => {
  if (DEBUG) console.log("films.PUT: " + req.params.id);
  try {
    await filmsDal.putFilm(req.params.id, req.body.title, req.body.year);
    res.redirect("/films/");
  } catch {
    res.status(503).render("503");
    myEmitter.emit("status", `Status Code: ${res.statusCode}`);
  }
});

router.patch("/:id", async (req, res) => {
  if (DEBUG) console.log("films.PATCH: " + req.params.id);
  try {
    await filmsDal.patchFilm(req.params.id, req.body.title, req.body.year);
    res.redirect("/films/");
  } catch {
    res.statusCode(503).res.render("503");
    myEmitter.emit("status", `Status Code: ${res.statusCode}`);
  }
});
router.delete("/:id", async (req, res) => {
  if (DEBUG) console.log("films.DELETE: " + req.params.id);
  try {
    await filmsDal.deleteFilm(req.params.id);
    res.redirect("/films/");
  } catch {
    res.statusCode(503).res.render("503");
    myEmitter.emit("status", `Status Code: ${res.statusCode}`);
  }
});

module.exports = router;
