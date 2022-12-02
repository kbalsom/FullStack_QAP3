//Written By: Kara Balsom
//Date Written: Nov. 29, 2022

var router = require("express").Router(); //Imports the express module and the Router() function, and assigns it to the constant express.
const filmsDal = require("../../services/m.films.dal"); //Requires the exports of the m.films.dal.js file, and assigns them to the constant dal.
var bodyParser = require("body-parser"); //Requires the body-parser module, and assigns them to the constant bodyParser.
const EventEmitter = require("events"); //Imports the global events module, and assigns it to the constant EventEmiter.
class MyEmitter extends EventEmitter {} //Creates a class MyEmitter, that inherits the properties of EventEmiiter.
const myEmitter = new MyEmitter();
const logger = require("../../logger.js"); //Imports the logger.js file, and assigns it to the constant logger. This allows any modules exported there to be used here.

router.use(bodyParser.json()); //Enables parsing of JSON data that is sent in from POSTMAN, curl requests etc. so that the functions below can handle them.

logger.fileOps(); //Calls the fileOps() function from logger.js. This will create the logging directory/file if it does not already exist.

//A listener is added, which listens for events called "status", which has a parameter of "msg". When the event is invoked, the listener will log the "msg" to the console, and passes the "msg" to the append function in logger.js. That function will append the "msg" to the specified file.
myEmitter.addListener("status", (msg) => {
  console.log(msg);
  logger.addToFile(msg);
});

//router.get handles get requests coming in from the specified route, and sends a response.
router.get("/", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/films/ GET " + req.url); //If debug is true, will console log the message.
  try {
    let theFilms = await filmsDal.getFilms(); //Calls the function getFilms in the m.films.dal.js file, and waits for it to run. Assigns the constant theFilms to the results which are returned.
    res.json(theFilms); //Sends a response with theFilms as json data.
  } catch {
    res.statusCode = 503; //If there is an error, the status code is set to 503.
    myEmitter.emit("status", `Status Code: ${res.statusCode}`); //This invokes a "status" event, which will cause the listener above to execute it's code. The second parameter is the msg that is sent to the listener. In this case the msg is "Status Code:" and the status code that was set in the line above.
    res.json({ message: "Service Unavailable", status: 503 }); //Returns JSON data with a message and the status code as the response.
  }
});

//router.get handles get requests coming in from the specified route, and sends a response.
router.get("/:id", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/films/:id GET " + req.url); //If debug is true, will console log the message.
  try {
    let film = await filmsDal.getFilmByFilmId(req.params.id); //Calls the function getFilmByFilmId in the m.films.dal.js file, sends it the id requested as a parameter,and waits for it to run. Assigns the constant film to the returned results.
    if (film.length === 0) {
      //If the result is 0 length, aka does not exist, the status code is set to 404.
      res.statusCode = 404;
      myEmitter.emit("status", `Status Code: ${res.statusCode}`); //This invokes a "status" event, which will cause the listener above to execute it's code. The second parameter is the msg that is sent to the listener. In this case the msg is "Status Code:" and the status code that was set in the line above.
      res.json({ message: "Not Found", status: 404 }); //Returns JSON data with a message and the status code as the response.
    } else res.json(film); //Sends a response with film as json data.
  } catch {
    res.statusCode = 503; //If there is an error, the status code is set to 503.
    myEmitter.emit("status", `Status Code: ${res.statusCode}`); //This invokes a "status" event, which will cause the listener above to execute it's code. The second parameter is the msg that is sent to the listener. In this case the msg is "Status Code:" and the status code that was set in the line above.
    res.json({ message: "Service Unavailable", status: 503 }); //Returns JSON data with a message and the status code as the response.
  }
});

//route.post takes the request from the specified route, and posts the response back.
router.post("/", async (req, res) => {
  if (DEBUG) {
    console.log("ROUTE: /api/films/ POST"); //If debug is true, will console log the message.
  }
  try {
    await filmsDal.addFilm(req.body.title, req.body.year); //Calls the function addFilm in the m.films.dal.js file, sends it the reqested title and year as parameters ,and waits for it to run.
    res.statusCode = 201; //The status code is set to 201.
    res.json({ message: "Created", status: 201 }); //Response is sent with JSON data containing a message and the status code.
  } catch {
    res.statusCode = 503; //If there is an error, the status code is set to 503.
    myEmitter.emit("status", `Status Code: ${res.statusCode}`); //This invokes a "status" event, which will cause the listener above to execute it's code. The second parameter is the msg that is sent to the listener. In this case the msg is "Status Code:" and the status code that was set in the line above.
    res.json({ message: "Service Unavailable", status: 503 }); //Returns JSON data with a message and the status code as the response.
  }
});

//route.put takes the request from the specified route, and sends a response back.
router.put("/:id", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/films PUT " + req.params.id); //If debug is true, will console log the message.
  try {
    await filmsDal.putFilm(req.params.id, req.body.title, req.body.year); //Calls the function putFilm in the m.films.dal.js file, sends it the reqested id, title and year as parameters, and waits for it to run.
    res.statusCode = 200; //The status code is set to 200.
    res.json({ message: "OK", status: 200 }); //Response is sent with JSON data containing a message and the status code.
  } catch {
    res.statusCode = 503; //If there is an error, the status code is set to 503.
    myEmitter.emit("status", `Status Code: ${res.statusCode}`); //This invokes a "status" event, which will cause the listener above to execute it's code. The second parameter is the msg that is sent to the listener. In this case the msg is "Status Code:" and the status code that was set in the line above.
    res.json({ message: "Service Unavailable", status: 503 }); //Returns JSON data with a message and the status code as the response.
  }
});

//route.patch takes the request from the specified route, and sends a response back.
router.patch("/:id", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/films PATCH " + req.params.id); //If debug is true, will console log the message.
  try {
    await filmsDal.patchFilm(req.params.id, req.body.title, req.body.year); //Calls the function patchFilm in the m.films.dal.js file, sends it the reqested id, title and year as parameters, and waits for it to run.
    res.statusCode = 200; //The status code is set to 200.
    res.json({ message: "OK", status: 200 }); //Response is sent with JSON data containing a message and the status code.
  } catch {
    res.statusCode = 503; //If there is an error, the status code is set to 503.
    myEmitter.emit("status", `Status Code: ${res.statusCode}`); //This invokes a "status" event, which will cause the listener above to execute it's code. The second parameter is the msg that is sent to the listener. In this case the msg is "Status Code:" and the status code that was set in the line above.
    res.json({ message: "Service Unavailable", status: 503 }); //Returns JSON data with a message and the status code as the response.
  }
});

//route.delete takes the request from the specified route, and sends a response back.
router.delete("/:id", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/films DELETE " + req.params.id); //If debug is true, will console log the message.
  try {
    await filmsDal.deleteFilm(req.params.id); //Calls the function deleteFilm in the m.films.dal.js file, sends it the reqested id as a parameter, and waits for it to run.
    res.statusCode = 200; //The status code is set to 200.
    res.json({ message: "OK", status: 200 }); //Response is sent with JSON data containing a message and the status code.
  } catch {
    res.statusCode = 503; //If there is an error, the status code is set to 503.
    myEmitter.emit("status", `Status Code: ${res.statusCode}`); //This invokes a "status" event, which will cause the listener above to execute it's code. The second parameter is the msg that is sent to the listener. In this case the msg is "Status Code:" and the status code that was set in the line above.
    res.json({ message: "Service Unavailable", status: 503 }); //Returns JSON data with a message and the status code as the response.
  }
});

if (DEBUG) {
  router.stack.forEach(function (r) {
    if (r.route && r.route.path) {
      console.log(r.route.path);
    }
  });
}

//Exports the router.
module.exports = router;
