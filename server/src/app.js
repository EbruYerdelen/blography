require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const AuthRoutes = require("./modules/auth/auth.route")
const PostRoutes = require("./modules/post/post.route")

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000", // Change to your frontend URL in production
    credentials: true, // Allows cookies to be sent with requests
  })
);

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));



app.use("/auth", AuthRoutes)
app.use("/post", PostRoutes)

//any type of req to any route will be catched by the root route handler,so place this below all your handlers because order of middleware execution matters
app.use("/", (req, res) => {
  res.send("Hello world")
})

module.exports = app; 
