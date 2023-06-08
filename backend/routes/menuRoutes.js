import express from 'express';
import serverData from '../data.js';

const menuRoutes = express.Router();

menuRoutes.get('/', (req, res) => {
  res.send(serverData['Menu']);
});

menuRoutes.post('/:id', (req, res) => {
  const index = serverData['Menu'].findIndex((x) => x.id === req.params.id);
  if (index) {
    // update with payload
    serverData['Menu'][index] = JSON.parse(req.body);

    // send 200 - ok
    res.status(200).send();
  } else {
    // add new
    serverData['Menu'].push(JSON.parse(req.body));

    // send 201 - created
    res.status(201).send();
  }
});

menuRoutes.delete('/:id', (req, res) => {
  const index = serverData['Menu'].findIndex((x) => x.id === req.params.id);
  if (index) {
    // remove
    serverData['Menu'].splice(index, 1);

    // send 200 - ok
    res.status(200).send();
  } else {
    // send 404 - not found
    res.status(404).send();
  }
});

export default menuRoutes;
