export const weatherSchema = joi.object({
  lat: joi.number(),
  lon: joi.number(),
  date: joi.number(),
  desc: joi.string(),
  icon: joi.string(),
  feelsLike: joi.number(),
  humidity: joi.number(),
  temp: joi.number(),
  windStrength: joi.number(),
  windDirection: joi.number(),
});

export const userSchema = joi.object({
  location: joi
    .string()
    .regex(/[-&\/\\#,+()$~%.'":*?<>{}]/g, { invert: true }) //Check for special characters, invert true means they are not allowed.
    .required(),
});

export const locationSchema = joi.object({
  lat: joi.number(),
  lon: joi.number(),
});
