const Clarifai = require('clarifai');

const clarifaiApp = new Clarifai.App({
  apiKey: process.env.CLARIFAI_API_KEY
});

const handleAPICall = (req, res) => {
  if (!req.body.imageUrl) {
    return res.status(400).json("No image url submitted");
  }
  clarifaiApp.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.imageUrl)
    .then(data => res.json(data))
    .catch((err) => res.status(400).json("Unable to work with API"));
}

const handleImage = (db) => (req, res) => {
  const { id } = req.body;
  db('users').where({ id: id })
    .increment('entries', 1)
    .returning('entries')
    .then(entries => res.json(entries[0]))
    .catch((err) => res.status(400).json("Error getting entries"));
}

module.exports = {
  handleImage: handleImage,
  handleAPICall: handleAPICall
};