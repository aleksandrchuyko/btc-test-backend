const { RequestError } = require('../../utils');

const removeById = async (req, res) => {
  const { userId } = req.params;
  const result = { id: userId };
  if (!result) {
    throw RequestError(404, 'Not found');
  }
  res.status(201).json(result);
};

module.exports = removeById;
