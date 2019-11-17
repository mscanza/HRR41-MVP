const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost/paintings');

const artistSchema = mongoose.Schema({
  artistName: String,
  paintings: [{
    type: String
  }]
})

const PaintingModel = mongoose.model('PaintingModel', artistSchema);

const savePainting = function(name, paintingName, paintingData, callback) => {
  PaintingModel.findOne({artistName: name}, (err, doc) => {
    if (err) {
      callback(err);
    } else {
      if (doc.length) {
        let paintings = doc.paintings;
        let exists = false;
        for (let i = 0; i < paintings.length; i++) {
          if (paintings[i][0] === paintingName) {
            paintings[i][1] = paintingData;
            exists = true;
          }
        }
        if (!exists) {
          paintings.push([paintingName, paintingData]);
        }
        PaintingModel.updateOne({artistName: name}, {paintings: paintings}, (err, doc) => {
          if (err) {
            callback(err);
          } else {
            callback(null, doc);
          }
        })
      } else {
        artist = new PaintingModel({artistName: name, paintings: [[paintingName, paintingData]]})
        artist.save((err) => {
          if (err) {
            callback(err);
          } else {
            callback(null)
          }
        })
      }
    }
  })
};

const getPaintings = (name, callback) => {
  PaintingModel.findOne({artistName: name}, (err, doc) => {
    if (err) {
      callback(err);
    } else {
      callback(null, doc);
    }
  })
}