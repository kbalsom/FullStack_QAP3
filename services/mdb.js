const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://kbalsom:MacAlex@movies.u1liusa.mongodb.net/?retryWrites=true&w=majority";
const pool = new MongoClient(uri);

module.exports = pool;
