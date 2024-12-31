const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const port = 3020;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

mongoose.connect("mongodb://127.0.0.1:27017/Form");
const db = mongoose.connection;

db.once("open", () => {
  console.log("mongodb connection successfully..");
});

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  dateofvisit: String,
  visit_purpose: String,
  staff_knowledge: Number,
  store_cleanliness: Number,
  pricing: String,
  comments: String
});

const User = mongoose.model("User", UserSchema);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Survey.html"));
});

app.post("/submit-credentials", async (req, res) => {
  const { name, email, dateofvisit, visit_purpose, staff_knowledge, store_cleanliness, pricing, comments } = req.body;
  
  const user = new User({
    name,
    email,
    dateofvisit,
    visit_purpose,
    staff_knowledge,
    store_cleanliness,
    pricing,
    comments
  });

  try {
    await user.save();
    res.send("User credentials saved successfully!");
  } catch (error) {
    res.status(500).send("Failed to save user credentials.");
  }
});

app.listen(port, () => {
  console.log(`Server is started on port ${port}`);
});
