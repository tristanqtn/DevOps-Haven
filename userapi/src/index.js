const express = require("express");
const userRouter = require("./routes/user");
const bodyParser = require("body-parser");
const path = require("path");

let options = {
  swaggerDefinition: {
    info: {
      description: "This is a sample server",
      title: "Swagger",
      version: "1.0.0",
    },
    host: "localhost:3000",
    basePath: "/",
    produces: ["application/json"],
    consumes: ["application/json"],
    schemes: ["http"],
  },
  basedir: __dirname, //app absolute path
  files: ["./routes/*.js"], //Path to the API handle folder
};

const app = express();

const expressSwagger = require("express-swagger-generator")(app);
expressSwagger(options);

const port = process.env.PORT || 3000;

const db = require("./dbClient");
db.on("error", (err) => {
  console.error(err);
});

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/index.html")));

app.use("/user", userRouter);

const server = app.listen(port, (err) => {
  if (err) throw err;
  console.log("Server listening the port " + port);
});

module.exports = server;
