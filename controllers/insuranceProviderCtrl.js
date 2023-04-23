const insuranceProviderModel = require('../models/insuranceProviderModel');
const userModel = require('../models/userModels');
const getInsuranceProviderInfoController = async (req, res) => {
  try {
    const insuranceProvider = await insuranceProviderModel.findOne({
      userId: req.body.userId,
    });
    res.status(200).send({
      success: true,
      message: 'insuranceprovider data fetch success',
      data: insuranceProvider,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error in Fetching InsuranceProvider Details',
    });
  }
};

// update doc profile
const updateProfileController = async (req, res) => {
  try {
    const insuranceProvider = await insuranceProviderModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(201).send({
      success: true,
      message: 'InsuranceProvider Profile Updated',
      data: insuranceProvider,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'InsuranceProvider Profile Update issue',
      error,
    });
  }
};

//get single docotor
const getInsuranceProviderByIdController = async (req, res) => {
  try {
    const insuranceProvider = await insuranceProviderModel.findOne({
      _id: req.body.insuranceProviderId,
    });
    res.status(200).send({
      success: true,
      message: 'Sigle Doc Info Fetched',
      data: insuranceProvider,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Erro in Single docot info',
    });
  }
};

/*
const insuranceProviderAppointmentsController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    const appointments = await appointmentModel.find({
      doctorId: doctor._id,
    });
    res.status(200).send({
      success: true,
      message: "Doctor Appointments fetch Successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Doc Appointments",
    });
  }
};


const updateStatusController = async (req, res) => {
  try {
    const { appointmentsId, status } = req.body;
    const appointments = await appointmentModel.findByIdAndUpdate(
      appointmentsId,
      { status }
    );
    const user = await userModel.findOne({ _id: appointments.userId });
    const notifcation = user.notifcation;
    notifcation.push({
      type: "status-updated",
      message: `your appointment has been updated ${status}`,
      onCLickPath: "/doctor-appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Status Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Update Status",
    });
  }
};
*/

module.exports = {
  getInsuranceProviderInfoController,
  updateProfileController,
  getInsuranceProviderByIdController,
  //doctorAppointmentsController,
  //updateStatusController,
};
