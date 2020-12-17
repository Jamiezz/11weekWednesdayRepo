const express = require("express");
//csurf has a token that must match in the backend,
//its important because...
//
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

app.post("/create", csrfProtection, (req, res) => {
  const token = req.csrfToken();
  const errors = []; //well make an if conditional
// for each element on the body
const {firstName, lastName, email, password, confirmedPassword} = req.body
if(!firstName) errors.push('Please provide a first name.')
if(!lastName) errors.push('Please provide a last name.')
if(!email) errors.push('Please provide an email.')
if(!password) errors.push('Please provide a password.')
if(errors.length > 0) {
  res.render("create.pug", {
    users,
    token,
    errors,
    firstName,
    lastName,
    email
  });
  return
}
const user = {firstName, lastName, email, password}
users.push(user)
res.redirect("/");
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
