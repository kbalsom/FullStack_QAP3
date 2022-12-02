//Written By: Kara Balsom
//Date Written: Nov. 28, 2022

var router = require("express").Router(); //Imports the express module and the Router() function, and assigns it to the constant express.

//If debug is true, will console log the message.
if (DEBUG) {
  console.log("ROUTE: /api/films");
}

const filmsRouter = require("./films"); //Assign the constant filmsRouter to the ./film route.
router.use("/films", filmsRouter); //Use the filmsRouter when the /films route is called.

//Export the router.
module.exports = router;
