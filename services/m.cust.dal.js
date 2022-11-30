const { ObjectId } = require("mongodb");
const dal = require("./mdb");

async function getAllFilms() {
  if (DEBUG) console.log("cust.mongo.dal.getAllFilms()");
  try {
    await dal.connect();
    const cursor = dal.db("sample_mflix").collection("films").find();
    const results = await cursor.toArray();
    return results;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllFilms,
};
