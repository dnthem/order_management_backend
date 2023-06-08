import express from 'express';
import dotenv from 'dotenv';
import serverData  from './data.js';
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  console.log('There is a connection from the client', req.ip)
  res.send('Server is ready');
});

app.get('/:store', (req, res) => {
  const store = req.params.store;
  if (serverData[store]) {
    const result = `
      <pre>
        ${JSON.stringify(serverData[store], null, 4)}
      </pre>
    `;

    res.send(result);
  } else {
    res.status(404).send({ message: 'Store Not Found' });
  }
});

app.get('/:store/:id', (req, res) => {
  const store = req.params.store;
  const paramID = req.params.id;
  console.log({store, paramID});
  if (serverData[store]) {
    const index = serverData[store].findIndex((x) => x.id == paramID);
    if (index !== -1) {
      
      const result = `
        <pre>
          ${JSON.stringify(serverData[store][index], null, 4)}
        </pre>
      `;
      res.send(result);
    } else {
      res.status(404).send({ message: 'Item Not Found' });
    }
  } else {
    res.status(404).send({ message: 'Store Not Found' });
  }
});

app.post('/:store/:id', (req, res) => {
  const store = req.params.store;
  if (serverData[store]) {
    const index = serverData[store].findIndex((x) => x.id === req.params.id);
    if (index) {
      // update with payload
      serverData[store][index] = JSON.parse(req.body);

      // send 200 - ok
      res.status(200).send();
    } else {
      // add new
      serverData[store].push(JSON.parse(req.body));

      // send 201 - created
      res.status(201).send();
    }
  } else {
    res.status(404).send({ message: 'Store Not Found' });
  }
});

app.delete('/:store/:id', (req, res) => {
  const store = req.params.store;
  if (serverData[store]) {
    const index = serverData[store].findIndex((x) => x.id === req.params.id);
    if (index) {
      // remove
      serverData[store].splice(index, 1);

      // send 200 - ok
      res.status(200).send();
    } else {
      // send 404 - not found
      res.status(404).send();
    }
  } else {
    res.status(404).send({ message: 'Store Not Found' });
  }
});






const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});