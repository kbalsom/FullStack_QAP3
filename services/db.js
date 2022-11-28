// requiring the module
const { MongoClient } = require("mongodb");
// pulling in the environment module
const connectionString = process.env.MONG_URI;
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let dbConnection;
// calling the exports function
module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }
      // This was my connection to the mongoDB in compass that was needed for postman in DB course
      //  dbConnection = db.db("fall_2022_test");
      console.log("DT has successfully connected to MongoDB.");

      return callback();
    });
  },
  // below is needed to work with the mongo DB
  getDb: function () {
    return dbConnection;
  },
  // this exports the client to be able to connect to the DB and collection within the dal.js(data access layer) file
  client,
};
