const checkCurrent = async (req, res) => {
  const { email } = req.owner;
  
  res.status(200).json({
    email,
  });
};

module.exports = checkCurrent;
