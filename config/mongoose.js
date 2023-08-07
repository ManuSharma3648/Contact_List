//require the library
const mongoose = require("mongoose");

//connect to the database
mongoose.connect("mongodb://localhost/CONTACT_LIST_DB");

// checking the connection
const db = mongoose.connection;

// printing error if any error comes
db.on("error", function (err) {
  console.log(err.message);
});

//up and running then print the message
db.once("open", function () {
  console.log("Successfully connected to the database");
});
