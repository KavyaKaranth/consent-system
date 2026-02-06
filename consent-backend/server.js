const express = require("express");
const cors = require("cors");

const consentRoutes = require("./routes/consentRoutes");

const app = express();

app.use(cors()); // simple + works everywhere
app.use(express.json());

app.use("/api", consentRoutes);

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
