const express = require('express');
const {
  getAllUsersController,
  getAllDoctorsController,
  changeAccountStatusController,
  changeInsuranceProviderAccountStatusController,
  getAllInsuranceProvidersController,
} = require('../controllers/adminCtrl');

const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

//GET METHOD || USERS
router.get('/getAllUsers', authMiddleware, getAllUsersController);

//GET METHOD || DOCTORS
router.get('/getAllDoctors', authMiddleware, getAllDoctorsController);

//GET METHOD || INSURANCE PROVIDERS
router.get(
  '/getAllInsuranceProviders',
  authMiddleware,
  getAllInsuranceProvidersController
);

//POST ACCOUNT STATUS DOCTOR
router.post(
  '/changeAccountStatus',
  authMiddleware,
  changeAccountStatusController
);

//POST ACCOUNT STATUS INSURANCE PROVIDER
router.post(
  '/changeInsuranceProviderAccountStatus',
  authMiddleware,
  changeInsuranceProviderAccountStatusController
);

module.exports = router;
