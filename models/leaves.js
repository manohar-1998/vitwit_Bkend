const mongoose = require('mongoose');
const crud = require('../utils/crud-utils')
const Schema = mongoose.Schema;

const LeavesSchema = new Schema({
  userid: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  username: String,
  StartDate: String,
  EndDate: String,
  FirstName: String,
  LastName: String,
  PhoneNumber: String,
  LeaveDescription: String,
  isConfirmed: {
    type: Boolean,
    default: false
  },
  createdOn: String,
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  },
  createdBy: { type: Schema.Types.ObjectId, ref: 'users' }
})

const LeavesDetails = mongoose.model('leaves', LeavesSchema);

LeavesDetails.getRecrods = () => {
  return crud.getRecords(LeavesDetails);
}

LeavesDetails.getRecrods = (filter = {}) => {
  return crud.getRecords(LeavesDetails, filter);
}

LeavesDetails.getRecrod = (filter) => {
  return crud.getRecordByFilter(LeavesDetails, filter);
}

LeavesDetails.createRecrod = (record) => {
  return crud.createRecrod(LeavesDetails, record);
}

LeavesDetails.deleteRecrod = (filter) => {
  return crud.deleteRecrod(LeavesDetails, filter);
}

LeavesDetails.updateRecrod = (filter, record) => {
  return crud.updateRecrod(LeavesDetails, filter, record);
}

module.exports = LeavesDetails;
