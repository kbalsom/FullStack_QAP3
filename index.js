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
  res.render("index.ejs", { name: "Purple Monkey was here" });
});

const awardsRouter = require("./routes/awards");
app.use("/awards", awardsRouter);

// // anything beginning with "/api" will go into this
const apiRouter = require("./routes/awards");
app.use("/api/awards", apiRouter);

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
