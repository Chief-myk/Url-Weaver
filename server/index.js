const express = require('express');
const ConnectionDB = require('./connenction');
const urlRouter = require("./routes/url");
const middleware = require("./middleware/url");
const cors = require('cors');
const path = require("path");


const app = express();
const port = process.env.PORT || 3001;


app.use(cors())
app.use(express.json());

app.use(middleware());
ConnectionDB();


app.use(express.static(path.join(__dirname, "dist")));


// Use API routes
app.use("/api", urlRouter);

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "dist", "index.html"));
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}, check now on http://localhost:${port}/`);
});
