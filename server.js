require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger('dev'));

app.use(express.static(path.resolve(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
});

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
  console.log(`Use GraphQL at http://localhost:${PORT}`);
});
