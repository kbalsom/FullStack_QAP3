const express = require("express");
const methodOverride = require("method-override");
const app = express();
const PORT = 3000;

global.DEBUG = true;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.get("/about", (request, response) => {
  response.render("about.ejs");
});

const filmsRouter = require("./routes/films");
const custRouter = require("./routes/customer");
const apiRouter = require("./routes/api");

app.use("/films", filmsRouter);
app.use("/customer", custRouter);
app.use("/api", apiRouter);

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, () => {
  console.log(`Simple app running on port ${PORT}.`);
});
