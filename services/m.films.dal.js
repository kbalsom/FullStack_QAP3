const { ObjectId } = require("mongodb");
const dal = require("./mdb");

async function getFilms() {
  if (DEBUG) console.log("films.mongo.dal.getFilms()");
  try {
    await dal.connect();
    const cursor = dal.db("sample_mflix").collection("films").find();
    const results = await cursor.toArray();
    return results;
  } catch (error) {
    console.log(error);
  }
}

async function getFilmByFilmId(id) {
  if (DEBUG) console.log("films.mongo.dal.getFilmByFilmId()");
  try {
    await dal.connect();
    const result = dal
      .db("sample_mflix")
      .collection("films")
      .findOne({ _id: ObjectId(id) });
    return result;
  } catch (error) {
    console.log(error);
  }
}
async function addFilm(title, year) {
  if (DEBUG) console.log("films.mongo.dal.addFilm()");
  let newLogin = JSON.parse(
    `{ "title": "` + title + `", "year": "` + year + `" }`
  );
  try {
    await dal.connect();
    const result = await dal
      .db("sample_mflix")
      .collection("films")
      .insertOne(newLogin);
    return result.insertedId;
  } catch (error) {
    console.log(error);
  }
}
async function putFilm(id, title, year) {
  if (DEBUG) console.log("films.mongo.dal.putFilm()");
  try {
    await dal.connect();
    const result = await dal
      .db("sample_mflix")
      .collection("films")
      .replaceOne({ _id: ObjectId(id) }, { title: title, year: year });
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function patchFilm(id, title, year) {
  if (DEBUG) console.log("films.mongo.dal.patchFilm()");
  try {
    await dal.connect();
    const result = await dal
      .db("sample_mflix")
      .collection("films")
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { title: title, year: year } },
        { upsert: true, returnDocument: "after" }
      );
    return result;
  } catch (error) {
    console.log(error);
  }
}
async function deleteFilm(id) {
  if (DEBUG) console.log("films.mongo.dal.deleteFilm()");
  try {
    await dal.connect();
    const result = dal
      .db("sample_mflix")
      .collection("films")
      .deleteOne({ _id: ObjectId(id) });
    return result;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getFilms,
  getFilmByFilmId,
  addFilm,
  putFilm,
  patchFilm,
  deleteFilm,
};
