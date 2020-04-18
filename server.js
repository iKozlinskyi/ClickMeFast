const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist/ClickMeFast'));

app.get('/', (res, req) => {
  return req.sendFile(__dirname + '/dist/ClickMeFast/index.html');
});

app.listen(process.env.PORT || 8080);
