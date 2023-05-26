import Joi from "joi";

const login = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(100).alphanum()
});

const register = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().regex(RegExp("^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\\d]{10,}$")),
    confirmPassword: Joi.ref("password")
});


export default {
    login,
    register
};
