const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/submit", (req, res) => {
  console.log(req.body);
  res.send("Data received");
});

app.listen(3000, () => {
  console.log("Helper running on port 3000");
});
