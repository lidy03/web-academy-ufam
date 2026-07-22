import { Router } from "express";
import purchaseController from "./purchase.controller.js"
import { purchaseSchema } from "./purchase.schema.js";
import validate from "../../middleware/validate.js";
import isAuth from "../../middleware/isAuth.js";

const router = Router();

/**
 * @openapi
 * /purchase/cart:
 *   get:
 *     summary: Retorna o carrinho da sessão atual
 *     tags: [Compras]
 *     responses:
 *       200:
 *         description: Itens do carrinho
 */

router.get("/cart", purchaseController.cart);

/**
 * @openapi
 * /purchase/cart:
 *   post:
 *     summary: Adiciona um produto ao carrinho
 *     tags: [Compras]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 format: uuid
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Carrinho atualizado
 */

router.post("/cart", validate(purchaseSchema), purchaseController.addToCart);

/**
 * @openapi
 * /purchase/cart/{productId}:
 *   delete:
 *     summary: Remove um produto do carrinho
 *     tags: [Compras]
 */

router.delete("/cart/:productId",purchaseController.removeCartItem);


/**
 * @openapi
 * /purchase/complete:
 *   post:
 *     summary: Finaliza a compra, salvando os itens do carrinho no banco
 *     tags: [Compras]
 *     responses:
 *       201:
 *         description: Compra criada
 *       400:
 *         description: Carrinho vazio ou estoque insuficiente
 *       401:
 *         description: Usuário não autenticado
 */

router.post("/complete", isAuth, purchaseController.completePurchase);

export default router;

