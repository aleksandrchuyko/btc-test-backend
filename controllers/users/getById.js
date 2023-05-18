const { RequestError } = require('../../utils');

const getById = async (req, res) => {
    const { userId } = req.params;
    const result = {id: userId};
    if (!result) {
    throw RequestError(404, "Not found");
  }
    res.status(200).json(result);
}

module.exports = getById;