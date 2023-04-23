const mongoose = require('mongoose');

const insuranceProviderSchema = new mongoose.Schema(
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
    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true, 'address is required'],
    },
    status: {
      type: String,
      default: 'pending',
    },
  },
  { timestamps: true }
);

const insuranceProviderModel = mongoose.model(
  'insuranceProviders',
  insuranceProviderSchema
);
module.exports = insuranceProviderModel;
