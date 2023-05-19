const { User } = require("../../models/users/user");
const { RequestError } = require("../../utils");

const updateById = async (req, res) => {
  const { userId } = req.params;
  const result = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
  });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.status(201).json(result);
};

module.exports = updateById;
