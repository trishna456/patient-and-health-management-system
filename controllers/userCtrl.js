const userModel = require('../models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const doctorModel = require('../models/doctorModel');
const insuranceProviderModel = require('../models/insuranceProviderModel');
const appointmentModel = require('../models/appointmentModel');
const moment = require('moment');
const tokenModel = require('../models/tokenModel');
const crypto = require('crypto');
const { createRandomBytes } = require('../utils/helper');
const {
  generatePasswordResetTemplate,
  mailTransport,
  plainEmailTemplate,
} = require('../utils/email');

//register callback
const registerController = async (req, res) => {
  try {
    const exisitingUser = await userModel.findOne({ email: req.body.email });
    if (exisitingUser) {
      return res
        .status(200)
        .send({ message: 'User Already Exist', success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: 'Register Sucessfully', success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

// login callback
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: 'user not found', success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: 'Invlid EMail or Password', success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    res.status(200).send({ message: 'Login Success', success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
  }
};

//Forgot Password
const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(`Inside forgotPasswordController email: ${email}`);
    if (!email) {
      return res
        .status(200)
        .send({ message: 'Please Provide a Valid Email', success: false });
    }
    const user = await userModel.findOne({ email });
    console.log(`Inside forgotPasswordController user: ${user}`);
    if (!user) {
      return res
        .status(200)
        .send({ message: 'User Not Found', success: false });
    }
    const token = await tokenModel.findOne({ owner: user._id });
    console.log(`Inside forgotPasswordController token: ${token}`);
    if (token) {
      return res
        .status(200)
        .send({
          message: 'You can only request for another token after 1 hour',
          success: false,
        });
    }
    const randomBytes = await createRandomBytes();
    console.log(`Inside forgotPasswordController randomBytes: ${randomBytes}`);
    const resetToken = new tokenModel({ owner: user._id, token: randomBytes });
    await resetToken.save();
    mailTransport().sendMail({
      from: 'security@gmail.com',
      to: user.email,
      subject: 'Password Reset',
      html: generatePasswordResetTemplate(
        `http://localhost:3000/reset-password?token=${randomBytes}&id=${user._id}`
      ),
    });
    res.json({
      success: true,
      message: 'Password reset link is sent to your email.',
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: `Error in forgotPassword CTRL ${error.message}` });
  }
};

//Reset Password
const resetPasswordController = async (req, res) => {
  try {
    const { password } = req.body;
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res
        .status(200)
        .send({ message: 'User Not Found', success: false });
    }
    const isSamePassword = await bcrypt.compare(password, user.password);
    if (isSamePassword) {
      return res
        .status(200)
        .send({
          message: 'New Password Must be Different From Old Password',
          success: false,
        });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword.trim();
    console.log(user.password);
    await user.save();
    await tokenModel.findOneAndDelete({ owner: user._id });
    mailTransport().sendMail({
      from: 'security@gmail.com',
      to: user.email,
      subject: 'Password Reset Successfully',
      html: plainEmailTemplate(
        'Password Reset is Successfull',
        'Now You Can Login With New Password!'
      ),
    });
    res.json({ success: true, message: 'Password Reset is Successfull' });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: `Error in resetPassword CTRL ${error.message}` });
  }
};

const authController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        message: 'user not found',
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'auth error',
      success: false,
      error,
    });
  }
};

// Apply DOctor CTRL
const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = await doctorModel({ ...req.body, status: 'pending' });
    await newDoctor.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notifcation = adminUser.notifcation;
    notifcation.push({
      type: 'apply-doctor-request',
      message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A Doctor Account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + ' ' + newDoctor.lastName,
        onClickPath: '/admin/docotrs',
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notifcation });
    res.status(201).send({
      success: true,
      message: 'Doctor Account Applied SUccessfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error While Applying For Doctotr',
    });
  }
};

// Apply InsuranceProvider CTRL
const applyInsuranceProviderController = async (req, res) => {
  try {
    console.log('req to api');
    console.log(req);
    const newInsuranceProvider = await insuranceProviderModel({
      ...req.body,
      status: 'pending',
    });
    await newInsuranceProvider.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notifcation = adminUser.notifcation;
    notifcation.push({
      type: 'apply-insuranceProvider-request',
      message: `${newInsuranceProvider.firstName} ${newInsuranceProvider.lastName} Has Applied For A InsuranceProvider Account`,
      data: {
        insuranceProviderId: newInsuranceProvider._id,
        name:
          newInsuranceProvider.firstName + ' ' + newInsuranceProvider.lastName,
        onClickPath: '/admin/docotrs',
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notifcation });
    res.status(201).send({
      success: true,
      message: 'InsuranceProvider Account Applied SUccessfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error WHile Applying For Doctotr',
    });
  }
};

//notification ctrl
const getAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const seennotification = user.seennotification;
    const notifcation = user.notifcation;
    seennotification.push(...notifcation);
    user.notifcation = [];
    user.seennotification = notifcation;
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: 'all notification marked as read',
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Error in notification',
      success: false,
      error,
    });
  }
};

// delete notifications
const deleteAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.notifcation = [];
    user.seennotification = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: 'Notifications Deleted successfully',
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'unable to delete all notifications',
      error,
    });
  }
};

//GET ALL DOC
const getAllDocotrsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({ status: 'approved' });
    res.status(200).send({
      success: true,
      message: 'Docots Lists Fetched Successfully',
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Errro WHile Fetching DOcotr',
    });
  }
};

//BOOK APPOINTMENT
const bookeAppointmnetController = async (req, res) => {
  try {
    req.body.date = moment(req.body.date, 'DD-MM-YYYY').toISOString();
    req.body.time = moment(req.body.time, 'HH:mm').toISOString();
    req.body.status = 'pending';
    const newAppointment = new appointmentModel(req.body);
    await newAppointment.save();
    const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });
    user.notifcation.push({
      type: 'New-appointment-request',
      message: `A nEw Appointment Request from ${req.body.userInfo.name}`,
      onCLickPath: '/user/appointments',
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: 'Appointment Book succesfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error While Booking Appointment',
    });
  }
};

// booking bookingAvailabilityController
const bookingAvailabilityController = async (req, res) => {
  try {
    const date = moment(req.body.date, 'DD-MM-YY').toISOString();
    const fromTime = moment(req.body.time, 'HH:mm')
      .subtract(1, 'hours')
      .toISOString();
    const toTime = moment(req.body.time, 'HH:mm').add(1, 'hours').toISOString();
    const doctorId = req.body.doctorId;
    const appointments = await appointmentModel.find({
      doctorId,
      date,
      time: {
        $gte: fromTime,
        $lte: toTime,
      },
    });
    if (appointments.length > 0) {
      return res.status(200).send({
        message: 'Appointments not Availibale at this time',
        success: true,
      });
    } else {
      return res.status(200).send({
        success: true,
        message: 'Appointments available',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error In Booking',
    });
  }
};

const userAppointmentsController = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({
      userId: req.body.userId,
    });
    res.status(200).send({
      success: true,
      message: 'Users Appointments Fetch SUccessfully',
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error In User Appointments',
    });
  }
};

module.exports = {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  applyInsuranceProviderController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDocotrsController,
  bookeAppointmnetController,
  bookingAvailabilityController,
  userAppointmentsController,
  resetPasswordController,
  forgotPasswordController,
};
