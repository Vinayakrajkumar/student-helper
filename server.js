const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/submit", (req, res) => {
  console.log(req.body);
  res.send("Data received");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Helper running on port " + PORT);
});
