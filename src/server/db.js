const MongoClient = require('mongodb').MongoClient;

const state = {
  db: null
};

exports.connect = (url, params = {}, done) => {
  if (state.db) {
    return done();
  }

  return MongoClient.connect(url, params, (err, db) => {
    if (err) {
      return done(err);
    }
    state.db = db.db('myData');
    return done();
  });
};

exports.get = () => state.db;
