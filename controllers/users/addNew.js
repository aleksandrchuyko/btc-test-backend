const addNew = async (req, res) => {
    const result = req.body;
    res.status(201).json(result);
}

module.exports = addNew;