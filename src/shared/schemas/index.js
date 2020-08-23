import { schema } from 'normalizr';

const staffShema = new schema.Entity('staff', undefined, {
  idAttribute: staff => staff._id, // eslint-disable-line
});

const departmentShema = new schema.Entity('department', undefined, {
  idAttribute: department => department._id, // eslint-disable-line
});

export default {
  STAFF: [staffShema],
  STAFF_OBJECT: staffShema,
  DEPARTMENT: [departmentShema],
};
