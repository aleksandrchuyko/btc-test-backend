const { User } = require("../../models/users/user");
const { RequestError } = require("../../utils");

const getById = async (req, res) => {
  const { userId } = req.params;
  const result = await User.findOne({ _id: userId });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = getById;
