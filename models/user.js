const mongoose = require("mongoose");
const Joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    min: 5,
    max: 50
  },
  password: {
    type: String,
    required: true,
    trim: true,
    min: 5,
    max: 50
  },
  email: {
    type: String,
    required: true,
    trim: true,
    index: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

userSchema.method("generateAuthToken", function() {
  const data = _.pick(this, ['_id']);
  const token = jwt.sign(data, config.get("jwtPrivateKey"));
  return token;
})

const User = mongoose.model("User", userSchema);

const validate = {};

validate.create = (input) => {
  const joiSchema = Joi.object({
    username: Joi.string().required().min(5).max(50).messages({
      "any.required": "need username"
    }),
    password: Joi.string().required().min(5).max(50),
    confirmedPassword: Joi.string().valid(Joi.ref('password')).required().messages({
      "any.only": "確認密碼不符!"
    }),
    email: Joi.string().required()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
  });
  return joiSchema.validate(input);
}

validate.update = (input) => {
  const joiSchema = Joi.object({
    _id: Joi.string(),
    username: Joi.string().required().min(5).max(50).messages({
      "any.required": "need username"
    }),
    email: Joi.string().required()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
  });
  return joiSchema.validate(input);
}

validate.changePassword = (input) => {
  const joiSchema = Joi.object({
    username: Joi.string().required().min(5).max(50).messages({
      "any.required": "need username"
    }),
    password: Joi.string().required().min(5).max(50),
    confirmedPassword: Joi.string().valid(Joi.ref('password')).required().messages({
      "any.only": "確認密碼不符!"
    }),
    email: Joi.string().required()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
  });
  return joiSchema.validate(input);
}

exports.User = User;
exports.validate = validate;

