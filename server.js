const express = require('express');
const knex = require('knex');
const cors = require('cors');
const registerHandler = require('./controllers/registerHandler');
const signInHandler = require('./controllers/signInHandler');
const profileHandler = require('./controllers/profileHandler');
const imageHandler = require('./controllers/imageHandler');

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
});

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('./smart-brain-client/build'));

app.get('/api', (req, res) => res.send("smart-brain-api is running"));
app.post('/api/signin', signInHandler.handleSignIn(db));
app.post('/api/register', registerHandler.handleRegister(db));
app.get('/api/profile/:id', profileHandler.handleProfile(db));
app.put('/api/image', imageHandler.handleImage(db));
app.post('/api/imageurl', imageHandler.handleAPICall);

app.get('*', (req, res) => {
  res.sendFile('./smart-brain-client/build/index.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("smart-brain-api is running on port " + PORT);
});
