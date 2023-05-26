import Joi from "joi";

const create = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    userId: Joi.number(),
});

const update = Joi.object({
    id: Joi.number().required(),
    title: Joi.string().required(),
    content: Joi.string().required(),
    userId: Joi.number(),
});



export default {
    create,
    update
}
