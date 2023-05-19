const { User } = require('../../models/users/user');

const getAll = async (req, res) => {
    const result = await User.find({}, "-createdAt -updatedAt");
    res.status(200).json(result);
}

module.exports = getAll;