require("dotenv").config({ path: "./.env" });

const dbo = require("./services/db");
const PORT = 3000;

const express = require("express");
const methodOverride = require("method-override");
const app = express();

global.DEBUG = true;
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })); // This is important!
app.use(methodOverride("_method")); // So is this!

app.get("/", (req, res) => {
  res.render("index.ejs", { name: "Kara" });
});

const MoviesRouter = require("./routes/movies");
app.use("/movies", MoviesRouter);

// // anything beginning with "/api" will go into this
const apiRouter = require("./routes/movies");
app.use("/api/movies", apiRouter);

const newMovieRouter = require("./routes/newmovie");
app.use("/newmovie", newMovieRouter);

app.use((req, res) => {
  res.status(404).render("404");
  console.log("second");
});

dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`);
  });
});
