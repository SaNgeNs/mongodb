const db = require('../db');

exports.allDepartment = (callback) => {
  db.get().collection('department').find().toArray((err, docs) => {
    callback(err, docs);
  });
};

exports.addDepartments = (callback) => {
  db.get().collection('department').insertMany([
    {
      "dpName": "HR"
    },
    {
      "dpName": "Tech"
    },
    {
      "dpName": "Finance"
    },
    {
      "dpName": "Test"
    }
  ], (err, result) => {
    callback(err, result);
  });
};
