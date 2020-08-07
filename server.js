const express = require("express");
const connectDB = require("./config/db");
const app = express();
//Connect Database

connectDB();

app.use(express.json({ extended: false }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
app.get("/", (req, res) => res.send("API running"));

//Define Routes
app.use("/users", require("./routes/api/users"));
app.use("/auth", require("./routes/api/auth"));
app.use("/communities", require("./routes/api/communities"));
app.use("/posts", require("./routes/api/posts"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
