const dal = require("./mdb");

async function getFilms() {
  const movies = await client.db("auth").collection("film").find();
  const results = await movies.toArray();
  return results;
}

module.exports = {
  getFilms,
};
