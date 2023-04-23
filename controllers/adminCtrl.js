const doctorModel = require('../models/doctorModel');
const userModel = require('../models/userModels');
const insuranceProviderModel = require('../models/insuranceProviderModel');

const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: 'users data list',
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'erorr while fetching users',
      error,
    });
  }
};

const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    res.status(200).send({
      success: true,
      message: 'Doctors Data list',
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'error while getting doctors data',
      error,
    });
  }
};

const getAllInsuranceProvidersController = async (req, res) => {
  try {
    const insuranceProviders = await insuranceProviderModel.find({});
    res.status(200).send({
      success: true,
      message: 'InsuranceProviders Data list',
      data: insuranceProviders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'error while getting insuranceproviders data',
      error,
    });
  }
};

// doctor account status
const changeAccountStatusController = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
    const user = await userModel.findOne({ _id: doctor.userId });
    const notifcation = user.notifcation;
    notifcation.push({
      type: 'doctor-account-request-updated',
      message: `Your Doctor Account Request Has ${status} `,
      onClickPath: '/notification',
    });
    user.isDoctor = status === 'approved' ? true : false;
    await user.save();
    res.status(201).send({
      success: true,
      message: 'Account Status Updated',
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in Account Status',
      error,
    });
  }
};

// insurance provider account status
const changeInsuranceProviderAccountStatusController = async (req, res) => {
  try {
    const { insuranceProviderId, status } = req.body;
    const insuranceProvider = await insuranceProviderModel.findByIdAndUpdate(
      insuranceProviderId,
      { status }
    );
    const user = await userModel.findOne({ _id: insuranceProvider.userId });
    const notifcation = user.notifcation;
    notifcation.push({
      type: 'insuranceprovider-account-request-updated',
      message: `Your InsuranceProvider Account Request Has ${status} `,
      onClickPath: '/notification',
    });
    user.isInsuranceProvider = status === 'approved' ? true : false;
    await user.save();
    res.status(201).send({
      success: true,
      message: 'Account Status Updated',
      data: insuranceProvider,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in Account Status',
      error,
    });
  }
};

module.exports = {
  getAllDoctorsController,
  getAllInsuranceProvidersController,
  getAllUsersController,
  changeAccountStatusController,
  changeInsuranceProviderAccountStatusController,
};
