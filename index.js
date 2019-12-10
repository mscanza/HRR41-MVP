const dotenv = require('dotenv');
dotenv.config();

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('./db/controllers.js');

const app = express();
app.use(bodyParser.json({limit: '99mb'}));
app.use(bodyParser.urlencoded({limit: '99mb', extended: true}));
app.use(express.static(path.join(__dirname, './client/dist')));

app.get('/api/:artist', (req, res) => {
  controllers.getPaintings(req.params.artist, (err, doc) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.status(200).send(doc);
    }
  })
})

app.post('/api/:artist', (req, res) => {
  controllers.savePainting(req.params.artist, req.body.paintingName, req.body.paintingData, (err, doc) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.status(201).send(doc);
    }
  })
})

app.delete('/api/:artist/:paintingName', (req, res) => {
  controllers.deletePainting(req.params.artist, req.params.paintingName, (err) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.sendStatus(202);
    }
  })
})


const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Web server running on: http://localhost:${PORT}`);
});