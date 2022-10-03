const express = require("express");
const app = express();

const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoose = require("mongoose");

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "roshan",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

const PORT = 5000;

const v = 5;

const CONNECTION_URL =
  "mongodb://localhost:27017/MyDatabase?directConnection=true";

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true });

const usersRouter = require("./routes/user");

app.use("/", usersRouter);

const cartRouter = require("./routes/cart");

app.use("/", cartRouter);

app.listen(PORT, () => {
  console.log("You are connected");
});
