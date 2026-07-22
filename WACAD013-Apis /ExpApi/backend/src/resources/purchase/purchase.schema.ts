import Joi from "joi";

export const purchaseSchema = Joi.object().keys({
    productId: Joi.string().uuid().required(),
    quantity: Joi.number().integer().min(1).required()
});

