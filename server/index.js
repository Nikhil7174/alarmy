const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const authRoute = require("./routes/auth");
const alarmsRoute = require("./routes/alarms");
const dotenv = require("dotenv");

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/alarm", alarmsRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});

// console.log("MONGO_URL:", process.env.MONGO_URL);
// console.log("PORT:", process.env.PORT);
