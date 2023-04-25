const express = require('express');
const {
  getPatientInfoController,
  updatePatientProfileController,
  getPatientByIdController,
  //updateStatusController,
} = require('../controllers/patientCtrl');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

//POST SINGLE DOC INFO
router.post('/getPatientInfo', authMiddleware, getPatientInfoController);

//POST UPDATE PROFILE
router.post('/updateProfile', authMiddleware, updatePatientProfileController);

//POST  GET SINGLE DOC INFO
router.post('/getPatientById', authMiddleware, getPatientByIdController);

//POST Update Status
//router.post("/update-status", authMiddleware, updateStatusController);

module.exports = router;
