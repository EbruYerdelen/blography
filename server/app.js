require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const AuthRoutes = require("./modules/auth/auth.route")

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/auth", AuthRoutes)

//any type of req to any route will be catched by the root route handler,so place this below all your handlers because order of middleware execution matters
app.use("/", (req, res) => {
  res.send("Hello world")
})

module.exports = app; 