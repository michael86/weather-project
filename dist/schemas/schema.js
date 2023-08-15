"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userSchema = joi_1.default.object({
    location: joi_1.default
        .string()
        .regex(/[-&\/\\#,+()$~%.'":*?<>{}]/, { invert: true })
        .min(0) //Check for special characters, invert true means they are not allowed.
        .required(),
});
