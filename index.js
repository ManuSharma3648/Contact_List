const express = require("express");
const path = require("path");
const port = 8000;

const db = require("./config/mongoose");
const Contact = require("./models/contact");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());
app.use(express.static("assets"));

app.get("/practice", async function (req, res) {
  try {
    return res.render("practice", {
      title: "this is practice",
    });
  } catch (err) {
    console.log("Error while fetching practice:", err);
    // Handle the error and respond appropriately
  }
});

app.get("/", async function (req, res) {
  try {
    const contacts = await Contact.find({});
    return res.render("home", {
      title: "My Contacts List",
      contact_list: contacts,
    });
  } catch (err) {
    console.log("Error while fetching contacts:", err);
    // Handle the error and respond appropriately
  }
});

app.post("/create-contact", async function (req, res) {
  const newContactData = {
    name: req.body.name,
    phone: req.body.phone,
  };

  try {
    const newContact = await Contact.create(newContactData);
    console.log("Contact created:", newContact);
    return res.redirect("back");
  } catch (err) {
    console.log("Error while creating the contact:", err);
    // Handle the error and respond appropriately
  }
});

app.listen(port, function (err) {
  if (err) {
    console.log("Error on the server", err);
  }
  console.log("The server is running!!!!");
});

app.get("/delete-contact/", async function (req, res) {
  let phone = req.query.phone;

  try {
    await Contact.findOneAndDelete({ phone: phone });
    console.log("Contact deleted:", phone);
  } catch (err) {
    console.log("Error while deleting the contact:", err);
    // Handle the error and respond appropriately
  }

  return res.redirect("back");
});
