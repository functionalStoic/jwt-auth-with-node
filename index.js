const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8888;
const users = [
  { id: 1, username: 'admin', password: 'admin' },
  { id: 2, username: 'guest', password: 'guest' }
];

app.use(bodyParser.json());
app.use(cors());

app.post('/login', ({ body: { username, password } }, res) => {
  if (!username || !password) {
    res.status(400).send('You need a username and password');
    return;
  }
  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    res.status(401).send('User not found');
    return;
  }

  const access_token = jwt.sign(
    {
      sub: user.id,
      username
    },
    'mysupersecretkey',
    { expiresIn: '3 hours' }
  );

  res.status(200).send({ access_token });
});

app.get('/status', (req, res) => {
  const localTime = new Date().toLocaleTimeString();

  res.status(200).send(`Server time is ${localTime}.`);
});

app.get('*', (req, res) => res.sendStatus(404));

// eslint-disable-next-line
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
