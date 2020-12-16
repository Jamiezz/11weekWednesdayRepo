const express = require("express");

const cookieParser = require('cookie-parser');
const csrf = require("csurf");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "pug");
app.use(cookieParser()); // Adding cookieParser() as application-wide middleware
app.use(express.urlencoded());
const csrfProtection = csrf({ cookie: true }); // creating csrfProtection middleware to use in specific routes



app.get("/", (req, res) => {
  res.render("index.pug", {users}); //the second arguement will always be in an obj
});

app.get("/create", csrfProtection, (req, res) => {
  const token = req.csrfToken();
  res.render("create.pug", {users, token}); //the second arguement will always be in an obj

});

app.get("/create-interesting", csrfProtection, (req, res) => {
  const token = req.csrfToken();
  res.render("create-interesting.pug", {users, token}); //the second arguement will always be in an obj

});

const users = [
  {
    id: 1,
    firstName: "Jill",
    lastName: "Jack",
    email: "jill.jack@gmail.com"
  }
];



app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
