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
    res.render("customer", { theFilms }); //Renders the films ejs page, and the results to the browser.
  } catch {
    res.statusCode = 503; //If there is an error, the status code is set to 503.
    myEmitter.emit("status", `Status Code: ${res.statusCode}`); //This invokes a "status" event, which will cause the listener above to execute it's code. The second parameter is the msg that is sent to the listener. In this case the msg is "Status Code:" and the status code that was set in the line above.
    res.render("503"); //The browser will render the 503 ejs page.
  }
});

//Exports the router.
module.exports = router;
