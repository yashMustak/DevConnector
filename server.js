const express = require("express");
const app = express();
const mongoose = require("mongoose");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const post = require("./routes/api/post");

//config db
const db = require("./config/keys").mongoURI;

//connnect to mongoDb
mongoose
  .connect(db)
  .then(() => console.log("Database connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello Express!"));

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/post", post);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
