const express = require('express');
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDocotrsController,
  bookeAppointmnetController,
  bookingAvailabilityController,
  userAppointmentsController,
  applyInsuranceProviderController,
  forgotPasswordController,
  resetPasswordController,
} = require('../controllers/userCtrl');
const authMiddleware = require('../middlewares/authMiddleware');
const { isResetTokenValid } = require('../middlewares/user');

//router onject
const router = express.Router();

//routes
//LOGIN || POST
router.post('/login', loginController);

//REGISTER || POST
router.post('/register', registerController);

//Forgot Password
router.post('/forgot-password', forgotPasswordController);

//Reset Password
router.post('/reset-password', isResetTokenValid, resetPasswordController);

//Auth || POST
router.post('/getUserData', authMiddleware, authController);

//Apply Doctor || POST
router.post('/apply-doctor', authMiddleware, applyDoctorController);

//Apply Insurance Provider || POST
router.post(
  '/apply-insuranceProvider',
  authMiddleware,
  applyInsuranceProviderController
);

//Notifiaction  Doctor || POST
router.post(
  '/get-all-notification',
  authMiddleware,
  getAllNotificationController
);
//Notifiaction  Doctor || POST
router.post(
  '/delete-all-notification',
  authMiddleware,
  deleteAllNotificationController
);

//GET ALL DOC
router.get('/getAllDoctors', authMiddleware, getAllDocotrsController);

//BOOK APPOINTMENT
router.post('/book-appointment', authMiddleware, bookeAppointmnetController);

//Booking Avliability
router.post(
  '/booking-availbility',
  authMiddleware,
  bookingAvailabilityController
);

//Appointments List
router.get('/user-appointments', authMiddleware, userAppointmentsController);

module.exports = router;
