var router = require("express").Router();
const filmsDal = require("../../services/m.films.dal");

router.get("/", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/films/ GET " + req.url);
  try {
    let theFilms = await filmsDal.getFilms();
    res.json(theFilms);
  } catch {
    // log this error to an error log file.
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
  }
});

router.get("/:id", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/films/:id GET " + req.url);
  try {
    let aFilm = await filmsDal.getFilmByFilmId(req.params.id);
    if (aFilm.length === 0) {
      // log this error to an error log file.
      res.statusCode = 404;
      res.json({ message: "Not Found", status: 404 });
    } else res.json(aFilm);
  } catch {
    // log this error to an error log file.
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
  }
});
router.post("/", async (req, res) => {
  if (DEBUG) {
    console.log("ROUTE: /api/films/ POST");
    //    console.log(req);
  }
  try {
    await filmsDal.addFilm(req.body.title, req.body.year);
    res.statusCode = 201;
    res.json({ message: "Created", status: 201 });
  } catch {
    // log this error to an error log file.
    res.statusCode = 503;
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
    // log this error to an error log file.
    res.statusCode = 503;
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
    // log this error to an error log file.
    res.statusCode = 503;
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
    // log this error to an error log file.
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
  }
});
// list the active api routes
if (DEBUG) {
  router.stack.forEach(function (r) {
    if (r.route && r.route.path) {
      console.log(r.route.path);
    }
  });
}

module.exports = router;
