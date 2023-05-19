const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongoSaveError } = require("../../utils");

const regexp = {
  name: /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
  email:
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

const userSchema = new Schema(
  {
    name: {
      type: String,
      match: regexp.name,
      required: [true, "Name is required"],
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
      minlength: 8,
    },
    email: {
      type: String,
      match: regexp.email,
      required: [true, "Email is required"],
      unique: true,
    },
  },
  { timestamps: true, versionKey: false }
);

userSchema.post("save", handleMongoSaveError);

const User = model("user", userSchema);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(regexp.email).required(),
  password: Joi.string().min(8).required(),
});

const updateSchema = Joi.object({
  email: Joi.string().pattern(regexp.email).required(),
  password: Joi.string().min(8).required(),
});

const schemas = {
    addSchema,
    updateSchema,
};

module.exports = {
  User,
  schemas,
};
