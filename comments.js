// Create web server
const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

// Use body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set view engine
app.set("view engine", "ejs");

// Set views path
app.set("views", path.join(__dirname, "views"));

// Set public path
app.use(express.static(path.join(__dirname, "public")));

// Read comments.json
const comments = JSON.parse(fs.readFileSync("comments.json"));

// Route - GET method
app.get("/", (req, res) => {
  res.render("index", { comments: comments });
});

// Route - POST method
app.post("/comments", (req, res) => {
  // Create comment object
  const comment = {
    name: req.body.name,
    comment: req.body.comment,
    date: new Date(),
  };

  // Push comment object to comments array
  comments.push(comment);

  // Write comments array to comments.json
  fs.writeFileSync("comments.json", JSON.stringify(comments));

  // Redirect to home page
  res.redirect("/");
});

// Listen to port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});