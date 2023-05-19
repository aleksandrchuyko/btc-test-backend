const { User } = require('../../models/users/user');

const addNew = async (req, res) => {
    const owner = req.owner._id;
    const result = await User.create({...req.body, owner});
    res.status(201).json(result);
}

module.exports = addNew;