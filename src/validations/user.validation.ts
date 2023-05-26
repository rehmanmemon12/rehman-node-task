import Joi from "joi";

const update = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    email: Joi.string().required().email(),
});

const passwordUpdate = Joi.object({
    password: Joi.string().regex(RegExp("^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\\d]{10,}$")),
    confirmPassword: Joi.ref("password"),
});

export default {
    update,
    passwordUpdate
};
