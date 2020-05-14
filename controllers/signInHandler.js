const bcrypt = require('bcrypt');

const handleSignIn = (db) => (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json("Invalid form submission");
  }

  db.select('username', 'hash').from('login').where({ username: username })
    .then(data => {
      if (!data.length) {
        return res.status(400).json("Username not found");
      }
      bcrypt.compare(password, data[0].hash, function(err, result) {
        if (err || !result) {
          res.status(400).json("Wrong password");
        } else {
          db.select('*').from('users').where({ username: username })
            .then(user => res.json(user[0]))
            .catch((err) => res.status(400).json("Unable to get user data"));
        }
      })
    })
    .catch((err) => res.status(400).json("Unable to sign in"));
}

module.exports = {
  handleSignIn: handleSignIn
};
