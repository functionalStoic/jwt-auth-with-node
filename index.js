const express = require('express');
const app = express();

app.get('/status', (req, res) => {
  const localTime = new Date().toLocaleTimeString();

  res.status(200).send(`Server time is ${localTime}.`);
});

app.get('*', (req, res) => res.sendStatus(404));

const PORT = 8888;

// eslint-disable-next-line
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
