const userModel = require('../models/userModels');
const ResetToken = require('../models/tokenModel');
const { isValidObjectId } = require('mongoose');

exports.isResetTokenValid = async (req, res, next) => {
  const { token, id } = req.query;
  if (!token || !id) {
    return res
      .status(200)
      .send({ message: 'Invalid Request ', success: false });
  }
  if (!isValidObjectId(id)) {
    return res.status(200).send({ message: 'Invalid User!', success: false });
  }
  const user = await userModel.findById(id);
  if (!user) {
    return res.status(200).send({ message: 'User Not Found', success: false });
  }
  const resetToken = await ResetToken.findOne({ owner: user._id });
  if (!resetToken) {
    return res
      .status(200)
      .send({ message: 'Reset Token Not Found', success: false });
  }
  const isValid = await resetToken.compareToken(token);
  if (!isValid) {
    return res
      .status(200)
      .send({ message: 'Reset Token is Invalid', success: false });
  }
  req.user = user;
  next();
};
