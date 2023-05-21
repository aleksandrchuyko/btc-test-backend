const { User } = require('../../models/users/user');

const getAll = async (req, res) => {
  const owner = req.owner._id;

  const { page = 1, limit = 100 } = req.query;
  const skip = (page - 1) * limit;

  const queryParams = { owner };

  const result = await User.find(queryParams, '-createdAt -updatedAt', {
    skip,
    limit,
  }).populate('owner', 'email');
  res.status(200).json(result);
};

module.exports = getAll;
