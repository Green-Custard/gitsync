const express = require('express');
const app = express();

const store = {};

app.put('/syncJob', (req, res) => {
  const id = String(Math.floor(Math.random() * 100000000000));
  store[id] = {
    id,
    publicKey: 'ssh-rsa 1234',
    secret: '1234',
  };
  res.send(JSON.stringify(store[id]));
});

app.get('/syncJob/:id', (req, res) => {
  if (!store[req.params.id]) {
    return res.sendStatus(404);
  }
  res.send(JSON.stringify(store[req.params.id] || {}));
});

app.delete('/syncJob/:id', (req, res) => {
  if (!store[req.params.id]) {
    return res.sendStatus(404);
  }
  delete store[req.params.id];
  res.sendStatus(200);
});

app.listen(3124, '0.0.0.0', () => {
  console.log('Mock GitSync Server is listening on 3124.');
});
