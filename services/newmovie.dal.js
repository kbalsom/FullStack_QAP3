// const dal = require("./db");
const express = require("express");
const { client } = require("./db");
const dbo = require("./db");
const { render } = require("ejs");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

const postMovie = async (req, res) => {
  let { title } = req.body.title;
  let { plot } = req.body.plot;
  let { genres } = req.body.genres;
  let { runtime } = req.body.runtime;
  let { cast } = req.body.cast;
  let { directors } = req.body.directors;
  let insertData = { title, plot, genres, runtime, cast, directors };
  DEBUG && console.log("post attempted");
  client.db("sample_mflix").collection("films").insertOne(insertData);
};

module.exports = { postMovie };
