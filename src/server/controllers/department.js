const department = require('../models/department');

exports.allDepartment = (req, res) => {
  department.allDepartment((err, docs) => {
    if (err) {
      console.warn(err);
      return res.sendStatus(500);
    }
    return res.send(docs);
  });
};


exports.addDepartments = (req, res) => {
  department.addDepartments((err, result) => {
    if (err) {
      console.warn(err);
      return res.sendStatus(500);
    }
    return res.send(result.ops);
  });
};
