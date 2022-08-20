export const userSchema = joi.object({
  location: joi
    .string()
    .regex(/[-&\/\\#,+()$~%.'":*?<>{}]/, { invert: true }) //Check for special characters, invert true means they are not allowed.
    .required(),
});
