//Written By: Kara Balsom
//Date Written: Nov. 29, 2022

const { ObjectId } = require("mongodb"); //Require MongoDb module and assign it to the constant ObjectId.
const dal = require("./mdb"); //Assign the constant dal to the exports from the mdb.js file.

//Async function getFilms, which will return all entries from the collection films in the sample_mflix database.
async function getFilms() {
  if (DEBUG) console.log("films.mongo.dal.getFilms()"); //Console log the message if debug = true.
  try {
    await dal.connect(); //Wait for the dal to connect to the database.
    const cursor = dal.db("sample_mflix").collection("films").find(); //Searches the films collection in the sample_mflix database and finds all (.find()). Assigns it to the constant cursor.
    const results = await cursor.toArray(); //Wait for cursor to change the results into an array, and assign the results to the constant results.
    return results; //Return the constant results.
  } catch (error) {
    console.log(error); //If an error occurs, console log it.
  }
}

//Async function getFilmByFilmId, which will return the entry from the collection films in the sample_mflix database with the requested id.
async function getFilmByFilmId(id) {
  //Takes the parameter id from the request.
  if (DEBUG) console.log("films.mongo.dal.getFilmByFilmId()"); //Console log the message if debug = true.
  try {
    await dal.connect(); //Wait for the dal to connect.
    const result = dal
      .db("sample_mflix")
      .collection("films")
      .findOne({ _id: ObjectId(id) }); //Searches the films collection in the sample_mflix database and finds the entry with the specified id (.findOne()). Assigns it to the constant result.
    return result; //Return the result.
  } catch (error) {
    console.log(error); //If an error occurs, console log it.
  }
}

//Async function addFilm, which will post an entry to the collection films in the sample_mflix database. Takes in title and year as parameters.
async function addFilm(title, year) {
  if (DEBUG) console.log("films.mongo.dal.addFilm()"); //Console log the message if debug = true.
  let newLogin = JSON.parse(
    `{ "title": "` + title + `", "year": "` + year + `" }`
  ); //Changes the request to JSON data that can be sent to the MongoDB database.
  try {
    await dal.connect(); //Wait for the dal to connect.
    const result = await dal
      .db("sample_mflix")
      .collection("films")
      .insertOne(newLogin); //Inserts the new entry into the films collection in the sample_mflix database. Assings the results to the constant results.
    return result.insertedId; //Returns the new id part of the results.
  } catch (error) {
    console.log(error); //If an error occurs, console log it.
  }
}

//Async Function putFilm, which will edit an entry to the collection films in the sample_mflix database. Takes in id, title and year as parameters.
async function putFilm(id, title, year) {
  if (DEBUG) console.log("films.mongo.dal.putFilm()"); //Console log the message if debug = true.
  try {
    await dal.connect();
    const result = await dal
      .db("sample_mflix")
      .collection("films")
      .replaceOne({ _id: ObjectId(id) }, { title: title, year: year }); //Replaces the title and year in the entry that matches the requested id using replaceOne(). Assigns the constant result.
    return result; //Returns the constant result.
  } catch (error) {
    console.log(error); //If an error occurs, console log it.
  }
}

//Async Function patchFilm, which will edit an entry to the collection films in the sample_mflix database. Takes in id, title and year as parameters.
async function patchFilm(id, title, year) {
  if (DEBUG) console.log("films.mongo.dal.patchFilm()"); //Console log the message if debug = true.
  try {
    await dal.connect(); //Wait for the dal to connect.
    const result = await dal
      .db("sample_mflix")
      .collection("films")
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { title: title, year: year } },
        { upsert: true, returnDocument: "after" } //Replaces the title and year in the entry that matches the requested id using updateOne(). Assigns the constant result.
      );
    return result; //Returns the constant result.
  } catch (error) {
    console.log(error); //If an error occurs, console log it.
  }
}

//Async Function deleteFilm, which will delete an entry from the collection films in the sample_mflix database. Takes in id as a parameter.
async function deleteFilm(id) {
  if (DEBUG) console.log("films.mongo.dal.deleteFilm()"); //Console log the message if debug = true.
  try {
    await dal.connect(); //Wait for the dal to connect.
    const result = dal
      .db("sample_mflix")
      .collection("films")
      .deleteOne({ _id: ObjectId(id) }); //Replaces the entry with the requested id using deleteOne(). Assigns the constant result.
    return result; //Returns the constant result.
  } catch (error) {
    console.log(error); //If an error occurs, console log it.
  }
}

//Exports the functions to be used elsewhere.
module.exports = {
  getFilms,
  getFilmByFilmId,
  addFilm,
  putFilm,
  patchFilm,
  deleteFilm,
};
