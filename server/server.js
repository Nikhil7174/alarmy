const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;
const cors = require("cors");

mongoose.connect(
  "mongodb+srv://nikhilkumarsingh7174:gRpdGk4QbNc5e@cluster01.drckdar.mongodb.net/Alarm?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
