const express = require('express');
const app = express();
const fs = require("fs");

app.get('/', (req, res) => {
  var ass = fs.readFileSync('./db/vegatest.vg.json');
  res.send(ass);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));