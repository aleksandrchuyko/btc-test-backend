const bcrypt = require('bcryptjs');

const { Owner } = require('../../models/owners/owner');
const { RequestError } = require('../../utils');

const register = async (req, res) => {
  console.log("object")
  const { email, password } = req.body;
  const owner = await Owner.findOne({ email });
  if (owner) {
    throw RequestError(409, 'Email in use');
  }
  const hashPassword = await bcrypt.hash(password, 10);
  console.log(email, hashPassword);
  const result = await Owner.create({ email, password: hashPassword });
  res.status(201).json({
    email: result.email,
  });
};

module.exports = register;
