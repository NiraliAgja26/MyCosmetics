const mg = require('mongoose');

const userSchema = new mg.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true } // Plain text password
});

module.exports = mg.model('User', userSchema);