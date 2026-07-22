import { purchaseErrors } from "./purchase.errors.js";
import { finalizePurchase} from "./purchase.service.js";
import type { Request, Response } from "express";
import type { addToCartDto } from "./purchase.type.js";
import { StatusCodes } from "http-status-codes";

const addToCart = (req: Request, res: Response) => {
    const { productId, quantity } = req.body as addToCartDto;

    if (!req.session.cart) req.session.cart = [];

    const existing = req.session.cart.find((item) => item.productId === productId);
    if (existing) existing.quantity += quantity;
    else req.session.cart.push({ productId, quantity });

    res.status(StatusCodes.OK).json(req.session.cart);
};

const cart = (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json(req.session.cart?? []);
}

const removeCartItem = (req: Request, res: Response) => {
    const { productId } = req.params;
    req.session.cart = (req.session.cart ?? []).filter((item) => item.productId !== productId);
    res.status(StatusCodes.OK).json(req.session.cart);
};

const completePurchase = async (req: Request, res: Response) => {
    try{
        const result = await finalizePurchase(req.session.userId!, req.session.cart ?? []);
        if (!result.ok) {
            switch (result.reason) {
                case "EMPTY":
                    return res.status(StatusCodes.BAD_REQUEST).send("Carrinho vazio.");
                case "PRODUCT_NOT_FOUND":
                    return res.status(StatusCodes.NOT_FOUND).send(`Produto ${result.productId} não encontrado.`);
                case "NO_STOCK":
                    return res.status(StatusCodes.BAD_REQUEST).send(`Estoque insuficiente para ${result.productName}.`);
            }
        }

        req.session.cart = [];
        res.status(StatusCodes.CREATED).json(result.purchase);
    }catch (err){
        purchaseErrors(err, res);
    }
}

export default { addToCart, cart, removeCartItem, completePurchase };

