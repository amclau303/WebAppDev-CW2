const express = require("express");
const app = express();
const path = require("path");
const public = path.join(__dirname, "public");
app.use(express.static(public));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));

const mustache = require("mustache-express");
app.engine("mustache", mustache());
app.set("view engine", "mustache");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
require("dotenv").config();
const nedb = require("nedb");
const router = require("./routes/websiteRoutes");
app.use("/", router);

app.listen(3000, () => {
  console.log("Server started on port 3000. Ctrl^c to quit.");
});
