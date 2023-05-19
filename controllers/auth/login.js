const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { Owner } = require("../../models/owners/owner");
const { RequestError } = require("../../utils");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const owner = await Owner.findOne({ email });
  if (!owner) {
    throw RequestError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, owner.password);
  if (!passwordCompare) {
    throw RequestError(401, "Email or password is wrong");
  }
  const payload = {
    id: owner._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "30d" });
  await Owner.findByIdAndUpdate(owner._id, { token });
  res.status(200).json({
    token,
    owner: {
      email: owner.email,
      subscription: owner.subscription,
    },
  });
};

module.exports = login;
