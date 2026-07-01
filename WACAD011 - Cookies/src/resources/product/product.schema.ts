import Joi from "joi";

export const productSchema = Joi.object().keys({
    name: Joi.string().min(3).max(50).required(),
    price: Joi.number().min(0).precision(2).required(),
    stock: Joi.number().min(0).required()
});

const product = {
    name: 'Notebook Dell',
    price: 2000.0,
    stock: 10,
}
const result = productSchema.validate(product);
console.log(result);
