const handleMongoSaveError = (error, data, next) => {

  const { code, name } = error;
  error.status = name === "MongoServerError" && code === 11000 ? 409 : 400;
  error.message = "Database saving error";
  next();
};

module.exports = handleMongoSaveError;
