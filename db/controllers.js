const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();



mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


mongoose.connect(process.env.DB, { useNewUrlParser: true });

const artistSchema = mongoose.Schema({
  artistName: String,
  paintings: Array
})

const PaintingModel = mongoose.model('PaintingModel', artistSchema);

const savePainting = (name, paintingName, paintingData, callback) => {
  PaintingModel.findOne({artistName: name}, (err, doc) => {
    if (err) {
      callback(err);
    } else {
      if (doc) {
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
       let artist = new PaintingModel({artistName: name, paintings: [[paintingName, paintingData]]})
      //  console.log(paintingName, paintingData)
      //   console.log(artist);
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

const deletePainting = (name, paintingName, callback) => {
  PaintingModel.findOne({artistName: name}, (err, doc) => {
    if (err) {
      callback(err);
    } else {

      if (doc) {
        let paintings = doc.paintings;
        for (let i = 0; i < paintings.length; i++) {
          if (paintings[i][0] === paintingName) {
            paintings.splice(i, 1);
          }
        }
        PaintingModel.updateOne({artistName: name}, {paintings: paintings}, (err, doc) => {
          if (err) {
            callback(err);
          } else {
            callback(null, doc);
          }
        })
      }
    }
  })
}

module.exports = {
  savePainting,
  getPaintings,
  deletePainting
}