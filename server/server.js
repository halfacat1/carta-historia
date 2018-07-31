const fs = require("fs");
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/', (req, res) => {
  var ass = fs.readFileSync('./db/vegatest.vg.json');
  res.send(ass);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));