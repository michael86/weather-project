"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
exports.userSchema = joi.object({
    location: joi
        .string()
        .regex(/[-&\/\\#,+()$~%.'":*?<>{}]/, { invert: true })
        .min(0) //Check for special characters, invert true means they are not allowed.
        .required(),
});
