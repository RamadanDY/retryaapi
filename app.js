import express from "express";
const app = express();
// we import the db connection to make sure it runs
import("./db/taskdb.js");

const PORT = 6060;
app.get("/", (req, res) => {
  res.send("hello ");
});

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
