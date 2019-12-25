const fs = require("fs");
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send(fs.readFileSync('./db/vegatest.vg.json'));
});

app.get('/data', (req, res) => {
  res.send(fs.readFileSync('./db/db.json'));
});

app.listen(3100, () => console.log('Example app listening on port 3100!'));

// https://github.com/nodejs/node/issues/4182#issuecomment-163425328
process.on('SIGINT', function() {
  process.exit();
});