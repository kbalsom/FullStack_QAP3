const dal = require("./db");
const express = require("express");
const { client } = require("./db");
const { render } = require("ejs");

const app = express();

async function getMovies() {
  const movies = await client.db("sample_mflix").collection("movies").find();
  const results = await movies.toArray();
  return results;
}

module.exports = {
  getMovies,
};
