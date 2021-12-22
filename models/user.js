const mongoose = require('mongoose');
const crud = require('../utils/crud-utils')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: {
    type: String,
  },
  last_name: String,
  designation: {
    type: String,
  },
  Date_of_birth: String,
  Address: String,
  password: {
    type: String,
  },
  token: String,
  createdOn: String,
  updatedOn: String,
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  },
  createdBy: { type: Schema.Types.ObjectId, ref: 'users' }
})

const User = mongoose.model('users', UserSchema);

User.getRecrods = () => {
  return crud.getRecords(User);
}

User.getRecordByFilter = (filter = {}) => {
  return crud.getRecordByFilter(User, filter);
}

User.getRecrod = (filter) => {
  return crud.getRecord(User, filter);
}

User.createRecrod = (record) => {
  return crud.createRecrod(User, record);
}

User.deleteRecrod = (filter) => {
  return crud.deleteRecrod(User, filter);
}

User.updateRecrod = (filter, record) => {
  return crud.updateRecrod(User, filter, record);
}

module.exports = User;
