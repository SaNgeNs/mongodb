const staff = require('../models/staff');

exports.all = (req, res) => {
  const data = {
    page: req.query.page || 1,
    perPage: req.query['per-page'] || 50,
    text: req.query.text || '',
  };

  staff.all(data, (err, result) => {
    if (err) {
      console.warn(err);
      return res.sendStatus(500);
    }
    res.set({
      'x-pagination-total-count': result.count,
      'x-pagination-page-count': Math.ceil(result.count / result.perPage),
      'x-pagination-current-page': result.page,
      'x-pagination-per-page': result.docs.length,
    });

    res.set('Access-Control-Expose-Headers', ['x-pagination-total-count', 'x-pagination-page-count', 'x-pagination-current-page', 'x-pagination-per-page']);
    return res.send(result.docs);
  });
};

exports.UserInfo = (req, res) => {
  staff.UserInfo(req.query.token, (err, result) => {
    if (err) {
      console.log(err);
      return res.sendStatus(401);
    }
    return res.send(result);
  });
};

exports.authorization = (req, res) => {
  const {
    login,
    password,
  } = req.body;

	const data = {
		login,
    password,
	};

  staff.authorization(data, (err, result) => {
		if (err) {
			console.log(err);
			return res.sendStatus(401);
		}
		return res.send(result);
	});
};

exports.newStaff = (req, res) => {
	const {
		empName,
		empActive = false,
		empDepartment,
	} = req.body;

	if (!empName || !empDepartment) {
    return res.sendStatus(400);
	}

  const data = {
    empName,
    empActive,
    empDepartment,
  };

  return staff.newStaff(data, (err, result) => {
    if (err) {
      console.log(err);
      return res.sendStatus(401);
    }
    return res.send(result.ops);
  });
};

exports.updateStaff = (req, res) => {
  const {
    empName,
    empActive,
    empDepartment,
	} = req.body;

  const newData = {};

  if (empName) {
    newData.empName = empName;
	}

  if (empActive) {
    newData.empActive = empActive;
  }

  if (empDepartment) {
    newData.empDepartment = empDepartment;
  }

  staff.updateStaff(
    req.params.id,
    { $set: newData,
    },
		(error, result) => {
      if (error) {
        console.log(error);
        return res.sendStatus(500);
      }
      return res.send(result);
		},
	);
};

exports.deleteStaff = (req, res) => {
  staff.deleteStaff(
    req.params.id,
    (err, result) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      return res.sendStatus(200);
    }
  );
};
