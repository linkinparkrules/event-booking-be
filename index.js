const express = require("express");
const app = express();
const {connectToDb} = require("./database");
const router = require("./routers");
const cors = require("cors");

const port = process.env.PORT;
// const port = 5001;

app.use(express.json());

const whitelist = ["http://localhost:3000", "http://localhost:5001"];
const corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
}
app.use(cors(corsOptions));

connectToDb();

app.use(router);


app.listen(port, () => {
  console.log("app is listening on port " + port);
});