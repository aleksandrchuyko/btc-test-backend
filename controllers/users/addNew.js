const { User } = require('../../models/users/user');

const addNew = async (req, res) => {
  const result = await User.create(req.body);

  const { name, email, _id } = result;
  res.status(201).json({ id: _id, name, email });
};

module.exports = addNew;
