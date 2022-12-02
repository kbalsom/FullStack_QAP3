var router = require("express").Router();
//const actorsDal = require('../../services/pg.actors.dal')
const filmsDal = require("../../services/m.films.dal");
const http = require("http");
const EventEmitter = require("events"); //Imports the global events module, and assigns it to the constant EventEmiter.
class MyEmitter extends EventEmitter {} //Creates a class MyEmitter, that inherits the properties of EventEmiiter.
const myEmitter = new MyEmitter();
const logger = require("../../logger.js");

logger.fileOps();

myEmitter.addListener("status", (msg) => {
  console.log(msg);
  logger.addToFile(msg);
});

router.get("/", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/films/ GET " + req.url);
  try {
    let theFilms = await filmsDal.getFilms();
    res.json(theFilms);
  } catch {
    res.statusCode = 503;
    myEmitter.emit("status", `Status Code: ${res.statusCode}`);
    res.json({ message: "Service Unavailable", status: 503 });
  }
});

router.get("/:id", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/films/:id GET " + req.url);
  console.log(req.params.id);
  try {
    let film = await filmsDal.getFilmByFilmId(req.params.id);
    if (film.length === 0) {
      res.statusCode = 404;
      myEmitter.emit("status", `Status Code: ${res.statusCode}`);
      res.json({ message: "Not Found", status: 404 });
    } else console.log(film);
    res.json(film);
  } catch {
    res.statusCode = 503;
    myEmitter.emit("status", `Status Code: ${res.statusCode}`);
    res.json({ message: "Service Unavailable", status: 503 });
  }
});

router.post("/", async (req, res) => {
  if (DEBUG) {
    console.log("ROUTE: /api/films/ POST");
  }
  try {
    await filmsDal.addFilm(req.body.title, req.body.year);
    res.statusCode = 201;
    console.log(req.body.title, req.body.year);
    res.json({ message: "Created", status: 201 });
  } catch {
    res.statusCode = 503;
    myEmitter.emit("status", `Status Code: ${res.statusCode}`);
    res.json({ message: "Service Unavailable", status: 503 });
  }
});

router.put("/:id", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/films PUT " + req.params.id);
  try {
    await filmsDal.putFilm(req.params.id, req.body.title, req.body.year);
    res.statusCode = 200;
    res.json({ message: "OK", status: 200 });
  } catch {
    res.statusCode = 503;
    myEmitter.emit("status", `Status Code: ${res.statusCode}`);
    res.json({ message: "Service Unavailable", status: 503 });
  }
});

router.patch("/:id", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/films PATCH " + req.params.id);
  try {
    await filmsDal.patchFilm(req.params.id, req.body.title, req.body.year);
    res.statusCode = 200;
    res.json({ message: "OK", status: 200 });
  } catch {
    res.statusCode = 503;
    myEmitter.emit("status", `Status Code: ${res.statusCode}`);
    res.json({ message: "Service Unavailable", status: 503 });
  }
});

router.delete("/:id", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/films DELETE " + req.params.id);
  try {
    await filmsDal.deleteFilm(req.params.id);
    res.statusCode = 200;
    res.json({ message: "OK", status: 200 });
  } catch {
    res.statusCode = 503;
    myEmitter.emit("status", `Status Code: ${res.statusCode}`);
    res.json({ message: "Service Unavailable", status: 503 });
  }
});

if (DEBUG) {
  router.stack.forEach(function (r) {
    if (r.route && r.route.path) {
      console.log(r.route.path);
    }
  });
}

module.exports = router;
