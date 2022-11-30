const express = require("express");
const router = express.Router();
// const actorsDal = require('../services/pg.actors.dal')
const custDal = require("../services/m.cust.dal");
const http = require("http");
const EventEmitter = require("events"); //Imports the global events module, and assigns it to the constant EventEmiter.
class MyEmitter extends EventEmitter {} //Creates a class MyEmitter, that inherits the properties of EventEmiiter.
const myEmitter = new MyEmitter();
const logger = require("../logger.js");

logger.fileOps();

myEmitter.addListener("status", (msg) => {
  console.log(msg);
  logger.addToFile(msg);
});

router.get("/", async (req, res) => {
  try {
    let theFilms = await custDal.getAllFilms();
    if (DEBUG) console.table(theFilms);
    res.render("customer", { theFilms });
  } catch {
    res.statusCode(503).res.render("503");
    myEmitter.emit("status", `Status Code: ${res.statusCode}`);
  }
});

module.exports = router;
