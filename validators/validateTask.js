const Joi = require('joi');

exports.taskSchema = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string().required(),
  status: Joi.string().valid('pending', 'completed').optional(),
  priority: Joi.string().valid('low', 'medium', 'high').required(),
  due_date: Joi.date().required(),
  labels: Joi.array().items(Joi.string()).optional(),
});
