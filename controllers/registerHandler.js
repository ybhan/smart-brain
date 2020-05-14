const bcrypt = require('bcrypt');

const saltRounds = 10;

const handleRegister = (db) => (req, res) => {
  const { username, name, password } = req.body;

  if (!username || !name || !password) {
    return res.status(400).json("Invalid form submission");
  }

  bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) {
      return res.status(400).json("Invalid password");
    }

    db('login').insert({
      username: username,
      hash: hash
    }).catch((err) => res.status(400).json("Unable to register"));

    db('users').insert({
      name: name,
      username: username,
      joined: new Date()
    })
      .returning('*')
      .then(user => res.json(user[0]))
      .catch((err) => res.status(400).json("Unable to register"));
  });
}

module.exports = {
  handleRegister: handleRegister
};
