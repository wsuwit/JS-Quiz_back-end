// const { sequelize } = require("./models");
// sequelize.sync({alter:true});

require("dotenv").config();
const authRoute = require("./routes/authRoute");
const cors = require("cors");
const errorController = require("./controllers/errorController");
const express = require("express");
const passport = require("passport");
const quizRoute = require("./routes/quizRoute");
require("./config/passport");

const app = express();

// # Passport is an authentication middleware that authenticates incoming requests, allowing authentication strategies to be applied.
app.use(passport.initialize());

// # middleware CORS: allow access cross-origin-sharing
app.use(cors());

// # built-in method in express to recognize the incoming request object as a JSON object. Do not need for GET or DELETE requests. Do need for POST and PUT requests.
app.use(express.json());

// # authenticate route
app.use("/auth", authRoute);

// # Express looks up the files relative to the static directory, so the name of the static directory is not part of the URL.
app.use("/public", express.static("public"));

// # quiz route
app.use("/quizzes", quizRoute);

// # path not found handling middleware
app.use((req, res) => {
  res
    .status(404)
    .json({ message: "The resource is not found on this server." });
});

// # error handling middleware
app.use(errorController);

const port = process.env.PORT || 5555;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
