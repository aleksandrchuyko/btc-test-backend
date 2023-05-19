const { Owner } = require("../../models/owners/owner");

const logout = async (req, res) => {
  console.log("logout");
  const { _id } = req.owner;
  await Owner.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({ message: "Logout success" });
};

module.exports = logout;
