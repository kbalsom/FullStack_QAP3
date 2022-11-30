const fs = require("fs"); //Imports the global fs (filesystem) module, and assigns it to the constant fs.
const moment = require("moment"); //I installed the npm moment.js, and this imports the modules of that npm and assigns them to the moment constant.
const EventEmitter = require("events"); //Imports the global events module, and assigns it to the constant EventEmiter.
class MyEmitter extends EventEmitter {} //Creates a class MyEmitter, that inherits the properties of EventEmiiter.
const myEmitter = new MyEmitter(); //Assigns the constant myEmitter to a new instance of the MyEmitter class.
const path = require("path"); //Imports the path module and assigns it to the constant path.

const date = String(moment().format("ll")); //This assigns the constant date to the stringified version of the current date, obtained through moment.js, in the format MMM D, YYYY.
const time = String(moment().format("LTS")); //This assigns the constant time to the stringified version of the current time, obtained through moment.js, in the format H:MM:SS PM/AM:
const month = moment().format("MMM"); //This assigns the constant month to the stringified version of the current month, obtained through moment.js, in the format MMM.
const year = moment().year(); //This assigns the constant year to the stringified version of the current year, obtained through moment.js, in the format YYYY.
const info = `File created on: ${date} \n`; //This assigns the constant info to the string, which includes the constant date.

function fileOps() {
  //Sets up a function called fileOps, which will make a new directory and file if they don't already exist. fileOps() is called on line 33 of index.js.
  if (!fs.existsSync(`./${month} ${year}`)) {
    //if a directory called ./current month current year (example ./Oct 2022) does not exist, the following code runs.
    fs.mkdir(`./${month} ${year}`, (err) => {
      //fs.mkdir makes a directory called ./current month current year, if there is an error it gives an error.
      if (err) throw err;
      console.log(`Directory ${month} ${year} created.`); //Logs the message to the terminal.
    });
  }

  if (!fs.existsSync(path.join(__dirname, `${month} ${year}`, date))) {
    //if a file in the directory ./current month current year called current date (example Oct 4, 2022) does not exist, the following code runs.
    fs.writeFile(
      path.join(__dirname, `${month} ${year}`, date),
      info,
      (err) => {
        //fs.writeFile creates the file in the specified directory. If there is an error it gives an error.
        if (err) throw err;
        console.log(`File created for ${date}.`); //Logs the message to the terminal.
      }
    );
  }
}

function addToFile(msg) {
  //This creates a function called append. It is called in index.js within the "route" and "status" listeners. When those listeners hear the event they are listening for, they call this function to append the information the event captured to the current date file.
  fs.appendFile(
    path.join(__dirname, `${month} ${year}`, date),
    time + ": " + msg + "\n",
    (err) => {
      //append file specifies the current date directory and file, and appends the current time, and the msg passed to it by the listeners in index.js.
      if (err) {
        console.log(err); //If the function encouters an error, an error message is logged to the terminal.
      }
      console.log(`${date} file appended`); //Logs the message to the terminal.
    }
  );
}

module.exports = {
  fileOps,
  addToFile,
};
