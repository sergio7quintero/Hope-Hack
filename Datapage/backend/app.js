const express = require("express");
const cors = require("cors");
const hbs = require("hbs");
const routes = require("./routes.js");
const bodyParser = require("body-parser");
//import function
const getData = require("./utils/rapidApi.js");
//Loads the handlebars module
const handlebars = require("express-handlebars");

const app = express();
app.use(cors());
app.use(express.static("public"));

//Sets our app to use the handlebars engine
app.set("view engine", "hbs");
app.set("views", "./views");
// app.use("/api", routes);

const PORT = 3000;

// app.get("/info", (req, res) => {
//   // res.send('data.html'); //how to serve static file as html
//   res.send(getData())
// });

const { error } = require("console");

app.get("/", (req, res) => {
  //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
  res.render("index");
});

app.get("/data", (req, res) => {
  res.sendFile("Datapage/frontend/data.html");
});

app.get("/api/data", (req, res) => {
  if (!req.query.state && !req.query.city) {
    res.send({
      error: "Enter a valid search",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
