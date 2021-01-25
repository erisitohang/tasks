const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Configuration
const port = process.env.PORT || 8080;

// Cors
app.use(cors());


app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send(JSON.stringify({ Hello: 'World' }));
});

app.listen(port, function () {
  console.log(`Starting Proxy at localhost:${port}`);
});
