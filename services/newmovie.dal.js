const dal = require("./db");
const express = require("express");
const { client } = require("./db");
const { render } = require("ejs");

const app = express();

async function addNewMovie() {
  const newMovie = await client.db("sample_mflix").collection("films").find();
  const results = await newMovie.toArray();
  return results;
}

module.exports = {
  addNewMovie,
};
