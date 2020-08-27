const ObjectID = require('mongodb').ObjectID;
const db = require('../db');

exports.all = (data, callback) => {
  const {
    page,
    perPage,
    text,
  } = data;

   if (text) {
     const reg = new RegExp(`^${text}$`, 'i');
     db.get().collection('staff').find({ empName: reg }).skip(page < 2 ? 0 : (page - 1) * perPage).limit(Number(perPage)).toArray((error, docs) => {
       db.get().collection('staff').find({ empName: reg }).toArray((err, allDocs) => {
         callback(error, {
           docs,
           count: allDocs.length,
           page: page < 0 ? 1 : page,
           perPage,
         });
       });
     });
   } else {
     db.get().collection('staff').find().skip(page < 2 ? 0 : (page - 1) * perPage).limit(Number(perPage)).toArray((err, docs) => {
       db.get().collection('staff').countDocuments().then(response => {
         callback(err, {
           docs,
           count: response,
           page: page < 0 ? 1 : page,
           perPage,
         });
       }).catch(error => (callback(error, [])));
     });
   }
};

exports.authorization = (data, callback) => {
	if (data.login === 'admin' && data.password === '123') {
    return callback(false, {
      token: 123,
			name: 'admin',
    });
	}

	return callback('Error', {});
};

exports.UserInfo = (token, callback) => {
  if (token === '123') {
    return callback(false, {
      token: 123,
      name: 'admin',
    });
  }

  return callback('Error', {});
};

exports.newStaff = (data, callback) => {
  db.get().collection('staff').insertOne(data, (err, result) => {
    callback(err, result);
  });
};

exports.updateStaff = (id, newData, callback) => {
  db.get().collection('staff').updateOne(
    {_id: ObjectID(id)},
    newData,
    (error, result) => {
      if (error) {
        callback(error, result);
      }

      db.get().collection('staff').findOne({_id: ObjectID(id)}).then(response => {
        callback(error, response);
      });
    }
  );
};

exports.deleteStaff = (id, cb) => {
  db.get().collection('staff').deleteOne(
    {_id: ObjectID(id)},
    (err, result) => {
      cb(err, result);
    }
  );
};
