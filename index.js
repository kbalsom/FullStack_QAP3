//Written By: Kara Balsom
//Date Written: Nov 27, 2022

const express = require("express"); //Imports the express module, and assigns it to the constant express.
const methodOverride = require("method-override"); //Imports method-override module, and assigns it to the constant methodOverride.
const app = express(); //Assigns the express function to the constant app.
const PORT = 3000; //Assigns the constant PORT to 3000.

global.DEBUG = true; //Global debug is set to true.
app.set("view engine", "ejs"); //Sets the template engine view to ejs.
app.use(express.static("public")); //Adds the middleware for serving static files.
app.use(express.urlencoded({ extended: true })); //Needed to recognize incoming requests as strings/arrays so they can be processed.
app.use(methodOverride("_method")); //This will override the method=POST in the ejs files for filmPatch, filmPut, and filmDelete to the specified method (ex. _method=PUT).

app.get("/", (req, res) => {
  res.render("index.ejs"); //Render the index.ejs in the browser when the route "/" is requested.
});

const filmsRouter = require("./routes/films"); //Assigns the constant filmsRouter to the middleware contained in the films.js file in the routes folder.
const custRouter = require("./routes/customer"); //Assigns the constant custRouter to the middleware contained in the customer.js file in the routes folder.
const apiRouter = require("./routes/api"); //Assigns the constant apiRouter to the middleware contained in the api folder.

app.use("/films", filmsRouter); //Uses the middleware assigned to the filmsRouter when the route /films is requested.
app.use("/customer", custRouter); //Uses the middleware assigned to the filmsRouter when the route /customer is requested.
app.use("/api", apiRouter); //Uses the middleware assigned to the apiRouter when the route /api is requested.

app.use((req, res) => {
  res.status(404).render("404");
}); //Renders the 404.ejs to the browser when the status is set to 404.

app.listen(PORT, () => {
  console.log(`Simple app running on port ${PORT}.`); //Listens on the port 3000 for requests and console logs out the message.
});
