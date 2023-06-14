import express from 'express';
import jwt from 'jsonwebtoken';
import serverData from '../data.js';
const router = express.Router();

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log('authHeader', authHeader);
  const token = authHeader && authHeader.split(' ')[1];
  console.log('token', token);
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err, user) => {
    console.log('err', err);

    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}

router.get('/', authenticateToken, (req, res) => {
  console.log(req.user);
  res.send(`Hello ${req.user.username}`);
});

// router.get('/:store', (req, res) => {
//   const store = req.params.store;
//   if (serverData[store]) {
//     const result = `
//       <pre>
//         ${JSON.stringify(serverData[store], null, 4)}
//       </pre>
//     `;

//     res.send(result);
//   } else {
//     res.status(404).send({ message: 'Store Not Found' });
//   }
// });

// router.get('/:store/:id', (req, res) => {
//   const store = req.params.store;
//   const paramID = req.params.id;
//   console.log({store, paramID});
//   if (serverData[store]) {
//     const index = serverData[store].findIndex((x) => x.id == paramID);
//     if (index !== -1) {
      
//       const result = `
//         <pre>
//           ${JSON.stringify(serverData[store][index], null, 4)}
//         </pre>
//       `;
//       res.send(result);
//     } else {
//       res.status(404).send({ message: 'Item Not Found' });
//     }
//   } else {
//     res.status(404).send({ message: 'Store Not Found' });
//   }
// });

// router.post('/:store/:id', (req, res) => {
//   const store = req.params.store;
//   if (serverData[store]) {
//     const index = serverData[store].findIndex((x) => x.id === req.params.id);
//     if (index) {
//       // update with payload
//       serverData[store][index] = JSON.parse(req.body);

//       // send 200 - ok
//       res.status(200).send();
//     } else {
//       // add new
//       serverData[store].push(JSON.parse(req.body));

//       // send 201 - created
//       res.status(201).send();
//     }
//   } else {
//     res.status(404).send({ message: 'Store Not Found' });
//   }
// });

// router.delete('/:store/:id', (req, res) => {
//   const store = req.params.store;
//   if (serverData[store]) {
//     const index = serverData[store].findIndex((x) => x.id === req.params.id);
//     if (index) {
//       // remove
//       serverData[store].splice(index, 1);

//       // send 200 - ok
//       res.status(200).send();
//     } else {
//       // send 404 - not found
//       res.status(404).send();
//     }
//   } else {
//     res.status(404).send({ message: 'Store Not Found' });
//   }
// });

export { router };