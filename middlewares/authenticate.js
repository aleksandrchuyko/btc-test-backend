const jwt = require("jsonwebtoken");

const {RequestError} = require("../utils");

const { Owner } = require("../models/owners/owner");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const autHeader = req.headers.authorization;
    if (!autHeader) {
      throw RequestError(401);
    }
    const [bearer, token] = req.headers.authorization.split(" ");

    if (bearer !== "Bearer") {
      throw RequestError(401);
    }

    const payload = jwt.verify(token, SECRET_KEY);
    const owner = await Owner.findById(payload.id);
    if (!owner || !owner.token || owner.token !== token) {
      throw RequestError(401);
    }
    req.owner = owner;

    next();
  } catch (error) {
    if (!error.status) {
      error.status = 401;
      error.message = "Unauthorized";
    }
    next(error);
  }
};

module.exports = authenticate;
