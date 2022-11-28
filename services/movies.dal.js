const dal = require("./db");

//get all awards.
var getAwards = function () {
  if (DEBUG) console.log("awards.dal.getAwards()");
  return new Promise(function (resolve, reject) {
    const sql = "SELECT award_id, name FROM award;";
    //   ORDER BY award_id DESC LIMIT 7;"
    if (DEBUG) console.log(sql);
    dal.query(sql, [], (err, result) => {
      if (err) {
        // logging should go here
        if (DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

module.exports = {
  getAwards,
};
