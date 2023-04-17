// const Joi = require('joi');

// const validateSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().email().required(),
//   phone: Joi.string().regex(/^\d{10}$/).required(),
// });

// const validate = (req, res, next) => {
//   const { error } = validateSchema.validate(req.body);
//   if (error) {
//     return res.status(400).json({ error: error.details[0].message });
//   }
//   next();
// };

// module.exports = validate;

const Joi = require('joi');

module.exports.userValidation = function (req, res, next) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().min(5).max(255).required(),
    phone: Joi.string().regex(/^\d{10}$/).required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

//  = {userValidation};