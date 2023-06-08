import express from 'express';
import serverData from '../data.js';

const orderRoutes = express.Router();

const STORE = 'OrdersV2';
orderRoutes.get('/', (req, res) => {
  res.send(serverData[STORE]);
});

orderRoutes.post('/:id', (req, res) => {
  const index = serverData[STORE].findIndex((x) => x.id === req.params.id);
  if (index) {
    // update with payload
    serverData[STORE][index] = JSON.parse(req.body);

    // send 200 - ok
    res.status(200).send();
  } else {
    // add new
    serverData[STORE].push(JSON.parse(req.body));

    // send 201 - created
    res.status(201).send();
  }
});

orderRoutes.delete('/:id', (req, res) => {
  const index = serverData[STORE].findIndex((x) => x.id === req.params.id);
  if (index) {
    // remove
    serverData[STORE].splice(index, 1);

    // send 200 - ok
    res.status(200).send();
  } else {
    // send 404 - not found
    res.status(404).send();
  }
});

export default orderRoutes;
