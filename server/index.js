const express = require('express');
const ConnectionDB = require('./connenction');
const urlRouter = require("./routes/url");
const middleware = require("./middleware/url");
const cors = require('cors');


const app = express();
const port = 3001;

app.use(cors())

app.use(middleware());
ConnectionDB();

const path = require("path");

app.use(express.static(path.join(__dirname, "dist")));


// Use API routes
app.use("/api", urlRouter);

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "dist", "index.html"));
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}, check now on http://localhost:${port}/`);
});
