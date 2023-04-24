const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const tokenSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users',
    unique: true,
  },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 3600 },
});

tokenSchema.pre('save', async function (next) {
  if (this.isModified('token')) {
    const hash = await bcrypt.hash(this.token, 8);
    this.token = hash;
  }
  next();
});

tokenSchema.methods.compareToken = async function (token) {
  const result = await bcrypt.compareSync(token, this.token);
  return result;
};

module.exports = mongoose.model('token', tokenSchema);
