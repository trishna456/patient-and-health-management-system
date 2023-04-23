const express = require('express');
const {
  getInsuranceProviderInfoController,
  updateProfileController,
  getInsuranceProviderByIdController,
  //insuranceproviderAppointmentsController,
  //updateStatusController,
} = require('../controllers/insuranceProviderCtrl');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

//POST SINGLE INSURANCE PROVIDER INFO
router.post(
  '/getInsuranceProviderInfo',
  authMiddleware,
  getInsuranceProviderInfoController
);

//POST UPDATE PROFILE
router.post('/updateProfile', authMiddleware, updateProfileController);

//POST  GET SINGLE DOC INFO
router.post(
  '/getInsuranceProviderById',
  authMiddleware,
  getInsuranceProviderByIdController
);

//GET Appointments
/*router.get(
  "/doctor-appointments",
  authMiddleware,
  doctorAppointmentsController
);*/

//POST Update Status
//router.post('/update-status', authMiddleware, updateStatusController);

module.exports = router;
