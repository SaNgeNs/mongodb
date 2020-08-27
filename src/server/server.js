const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const staffController = require('./controllers/staff');
const departmentController = require('./controllers/department');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();

  app.options('*', (request, response) => {
    response.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
    response.send();
  });
});

app.get('/staff', staffController.all);

app.post('/staff', staffController.newStaff);

app.put('/staff/:id', staffController.updateStaff);

app.delete('/staff/:id', staffController.deleteStaff);

app.get('/department', departmentController.allDepartment);

app.post('/department', departmentController.addDepartments);

app.post('/authorization', staffController.authorization);

app.get('/authorization', staffController.UserInfo);

db.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
  if (error) {
    return console.log('error ', error);
  }

  return app.listen(4000, () => {
    console.warn('API start');
  });
});
