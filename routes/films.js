//Written By: Kara Balsom
//Date Written: Nov. 29, 2022

const express = require("express"); //Imports the express module, and assigns it to the constant express.
const router = express.Router(); //Assigns the express.Router() function to the constant router.
const filmsDal = require("../services/m.films.dal"); //Requires the exports of the m.films.dal.js file, and assigns them to the constant dal.
const EventEmitter = require("events"); //Imports the global events module, and assigns it to the constant EventEmiter.
class MyEmitter extends EventEmitter {} //Creates a class MyEmitter, that inherits the properties of EventEmiiter.
const myEmitter = new MyEmitter();
const logger = require("../logger.js"); //Imports the logger.js file, and assigns it to the constant logger. This allows any modules exported there to be used here.

logger.fileOps(); //Calls the fileOps() function from logger.js. This will create the logging directory/file if it does not already exist.

//A listener is added, which listens for events called "status", which has a parameter of "msg". When the event is invoked, the listener will log the "msg" to the console, and passes the "msg" to the append function in logger.js. That function will append the "msg" to the specified file.
myEmitter.addListener("status", (msg) => {
  console.log(msg);
  logger.addToFile(msg);
});

//router.get handles get requests coming in from the specified route, and sends a response.
router.get("/", async (req, res) => {
  try {
    let theFilms = await filmsDal.getFilms(); //Calls the function getFilms in the m.films.dal.js file, and waits for it to run. Assigns the constant theFilms to the results which are returned.
    if (DEBUG) console.table(theFilms); //If debug is true, will console log the results in table form.
    res.render("films", { theFilms }); //Renders the films ejs page, and the results to the browser.
  } catch {
    res.statusCode(503).res.render("503"); //If there is an error, the status code is set to 503 and the browser will render the 503 ejs page.
    myEmitter.emit("status", `Status Code: ${res.statusCode}`); //This invokes a "status" event, which will cause the listener above to execute it's code. The second parameter is the msg that is sent to the listener. In this case the msg is "Status Code:" and the status code that was set in the line above.
  }
});

//router.get handles get requests coming in from the specified route, and sends a response.
router.get("/:id", async (req, res) => {
  try {
    let film = await filmsDal.getFilmByFilmId(req.params.id); //Calls the function getFilmByFilmId in the m.films.dal.js file, sends it the id requested as a parameter,and waits for it to run. Assigns the constant film to the returned results.
    if (film.length === 0) res.render("norecord");
    //If the result is 0 length, aka does not exist, the norecord ejs is rendered.
    else res.render("film", { film }); //If the results are not 0 length, aka they exist, the film ejs and the film constant are rendered to the browser.
  } catch {
    res.statusCode = 503;
    res.render("503"); //If there is an error, the status code is set to 503 and the browser will render the 503 ejs page.
    myEmitter.emit("status", `Status Code: ${res.statusCode}`); //This invokes a "status" event, which will cause the listener above to execute it's code. The second parameter is the msg that is sent to the listener. In this case the msg is "Status Code:" and the status code that was set in the line above.
  }
});

//router.get handles get requests coming in from the specified route, and sends a response.
router.get("/:id/replace", async (req, res) => {
  if (DEBUG) console.log("film.Replace : " + req.params.id); //If debug is true, will console log the message.
  res.render("filmPut.ejs", {
    title: req.query.title,
    year: req.query.year,
    theId: req.params.id,
  }); //Renders the title, year and id to the filmPut.ejs, so they appear in the input boxes so the user can confirm that is the entry they wish to replace.
});

//router.get handles get requests coming in from the specified route, and sends a response.
router.get("/:id/edit", async (req, res) => {
  if (DEBUG) console.log("film.Edit : " + req.params.id); //If debug is true, will console log the message.
  res.render("filmPatch.ejs", {
    title: req.query.title,
    year: req.query.year,
    theId: req.params.id,
  }); //Renders the title, year and id to the filmPatch.ejs, so they appear in the input boxes so the user can confirm that is the entry they wish to edit.
});

//router.get handles get requests coming in from the specified route, and sends a response.
router.get("/:id/delete", async (req, res) => {
  if (DEBUG) console.log("film.Delete : " + req.params.id); //If debug is true, will console log the message.
  res.render("filmDelete.ejs", {
    title: req.query.title,
    year: req.query.year,
    theId: req.params.id,
  }); //Renders the title, year and id to the filmPatch.ejs, so they appear in the input boxes so the user can confirm that is the entry they wish to delete.
});

//route.post takes the request from the specified route, and posts the response back.
router.post("/", async (req, res) => {
  if (DEBUG) console.log("films.POST"); //If debug is true, will console log the message.
  try {
    await filmsDal.addFilm(req.body.title, req.body.year); //Calls the function addFilm in the m.films.dal.js file, sends it the reqested title and year as parameters ,and waits for it to run.
    res.redirect("/films/"); //Redirects back to the films.ejs, where the list displayed will show the new entry.
  } catch {
    res.statusCode(503).res.render("503"); //If there is an error, the status code is set to 503 and the browser will render the 503 ejs page.
    myEmitter.emit("status", `Status Code: ${res.statusCode}`); //This invokes a "status" event, which will cause the listener above to execute it's code. The second parameter is the msg that is sent to the listener. In this case the msg is "Status Code:" and the status code that was set in the line above.
  }
});

//route.put takes the request from the specified route, and sends a response back.
router.put("/:id", async (req, res) => {
  if (DEBUG) console.log("films.PUT: " + req.params.id); //If debug is true, will console log the message.
  try {
    await filmsDal.putFilm(req.params.id, req.body.title, req.body.year); //Calls the function putFilm in the m.films.dal.js file, sends it the reqested id, title and year as parameters, and waits for it to run.
    res.redirect("/films/"); //Redirects back to the films.ejs, where the list displayed will show the edited entry.
  } catch {
    res.status(503).render("503"); //If there is an error, the status code is set to 503 and the browser will render the 503 ejs page.
    myEmitter.emit("status", `Status Code: ${res.statusCode}`); //This invokes a "status" event, which will cause the listener above to execute it's code. The second parameter is the msg that is sent to the listener. In this case the msg is "Status Code:" and the status code that was set in the line above.
  }
});

//route.patch takes the request from the specified route, and sends a response back.
router.patch("/:id", async (req, res) => {
  if (DEBUG) console.log("films.PATCH: " + req.params.id); //If debug is true, will console log the message.
  try {
    await filmsDal.patchFilm(req.params.id, req.body.title, req.body.year); //Calls the function patchFilm in the m.films.dal.js file, sends it the reqested id, title and year as parameters, and waits for it to run.
    res.redirect("/films/"); //Redirects back to the films.ejs, where the list displayed will show the edited entry.
  } catch {
    res.status(503).render("503"); //If there is an error, the status code is set to 503 and the browser will render the 503 ejs page.
    myEmitter.emit("status", `Status Code: ${res.statusCode}`); //This invokes a "status" event, which will cause the listener above to execute it's code. The second parameter is the msg that is sent to the listener. In this case the msg is "Status Code:" and the status code that was set in the line above.
  }
});

//route.delete takes the request from the specified route, and sends a response back.
router.delete("/:id", async (req, res) => {
  if (DEBUG) console.log("films.DELETE: " + req.params.id); //If debug is true, will console log the message.
  try {
    await filmsDal.deleteFilm(req.params.id); //Calls the function deleteFilm in the m.films.dal.js file, sends it the reqested id as a parameter, and waits for it to run.
    res.redirect("/films/"); //Redirects back to the films.ejs, where the list displayed will show the entry has been deleted.
  } catch {
    res.statusCode(503).res.render("503"); //If there is an error, the status code is set to 503 and the browser will render the 503 ejs page.
    myEmitter.emit("status", `Status Code: ${res.statusCode}`); //This invokes a "status" event, which will cause the listener above to execute it's code. The second parameter is the msg that is sent to the listener. In this case the msg is "Status Code:" and the status code that was set in the line above.
  }
});

//Exports the router.
module.exports = router;
