import * as Joi from 'joi'

export const joiValidator: Joi.ObjectSchema = Joi.object({
  PORT: Joi.number().required(),
  DB_PORT: Joi.number().required(),
  API_KEY: Joi.string().required(),
  DB_TYPE: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  DB_SYNCHRONIZE: Joi.string().required()
})
