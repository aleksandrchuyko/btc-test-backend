const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const { Owner } = require('../../models/owners/owner');
const { RequestError } = require('../../utils');

const register = async (req, res) => {
  const { email, password } = req.body;
  const owner = await Owner.findOne({ email });
  if (owner) {
    throw RequestError(409, 'Email in use');
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const result = await Owner.create({ email, password: hashPassword });

  const payload = {
    id: result._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '30d' });
  await Owner.findByIdAndUpdate(result._id, { token });

  res.status(201).json({
    email: result.email,
    token,
  });
};

module.exports = register;
