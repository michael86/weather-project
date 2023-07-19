export const userSchema = joi.object({
  location: joi
    .string()
    .regex(/[-&\/\\#,+()$~%.'":*?<>{}]/, { invert: true })
    .min(0) //Check for special characters, invert true means they are not allowed.
    .required(),
});
