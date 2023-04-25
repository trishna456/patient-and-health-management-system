const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    firstName: {
      type: String,
      required: [true, 'first name is required'],
    },
    lastName: {
      type: String,
      required: [true, 'last name is required'],
    },
    phone: {
      type: String,
      required: [true, 'phone no is required'],
    },
    email: {
      type: String,
      required: [true, 'email is required'],
    },

    address: {
      type: String,
      required: [true, 'address is required'],
    },
  },
  { timestamps: true }
);

const patientModel = mongoose.model('patients', patientSchema);
module.exports = patientModel;
