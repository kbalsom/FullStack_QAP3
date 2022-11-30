const { ObjectId } = require("mongodb");
const dal = require("./mdb");

async function getActors() {
  if (DEBUG) console.log("actors.mongo.dal.getActors()");
  try {
    await dal.connect();
    const cursor = dal.db("Auth").collection("actor").find();
    const results = await cursor.toArray();
    return results;
  } catch (error) {
    console.log(error);
  }
}

async function getActorByActorId(id) {
  if (DEBUG) console.log("actors.mongo.dal.getActorByActorId()");
  try {
    await dal.connect();
    const result = dal
      .db("Auth")
      .collection("actor")
      .findOne({ _id: ObjectId(id) });
    return result;
  } catch (error) {
    console.log(error);
  }
}
async function addActor(firstName, lastName) {
  if (DEBUG) console.log("actors.mongo.dal.addActor()");
  let newLogin = JSON.parse(
    `{ "first_name": "` + firstName + `", "last_name": "` + lastName + `" }`
  );
  try {
    await dal.connect();
    const result = await dal.db("Auth").collection("actor").insertOne(newLogin);
    return result.insertedId;
  } catch (error) {
    console.log(error);
  }
}
async function putActor(id, fname, lname) {
  if (DEBUG) console.log("actors.mongo.dal.putActor()");
  try {
    await dal.connect();
    const result = await dal
      .db("Auth")
      .collection("actor")
      .replaceOne(
        { _id: ObjectId(id) },
        { first_name: fname, last_name: lname }
      );
    return result;
  } catch (error) {
    console.log(error);
  }
}
async function patchActor(id, fname, lname) {
  if (DEBUG) console.log("actors.mongo.dal.patchActor()");
  try {
    await dal.connect();
    const result = await dal
      .db("Auth")
      .collection("actor")
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { first_name: fname, last_name: lname } },
        { upsert: true, returnDocument: "after" }
      );
    return result;
  } catch (error) {
    console.log(error);
  }
}
async function deleteActor(id) {
  if (DEBUG) console.log("actors.mongo.dal.deleteActor()");
  try {
    await dal.connect();
    const result = dal
      .db("Auth")
      .collection("actor")
      .deleteOne({ _id: ObjectId(id) });
    return result;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getActors,
  getActorByActorId,
  addActor,
  putActor,
  patchActor,
  deleteActor,
};
