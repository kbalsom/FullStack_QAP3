//Written By: Kara Balsom
//Date Written: Nov. 27, 2022

const { MongoClient } = require("mongodb"); //Require mongodb module and assign it to the constant MongoClient
const uri =
  "mongodb+srv://kbalsom:MacAlex@movies.u1liusa.mongodb.net/?retryWrites=true&w=majority"; //URI to my specific database.
const pool = new MongoClient(uri); //Assigns the constant pool to the database link.

module.exports = pool; //Export pool.
