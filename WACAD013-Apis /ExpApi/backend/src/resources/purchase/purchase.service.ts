import { Prisma, type Purchase } from "../../generated/prisma/client.js";
import { prisma } from "../../utils/prismaClient.js";
import type { cartItem, PurchaseResult } from "./purchase.type.js";

export async function finalizePurchase(userId: string, cart: cartItem[]): Promise<PurchaseResult> {
    if (!cart || cart.length === 0) {
        return { ok: false, reason: "EMPTY" };
    }

    const products = await prisma.product.findMany({
        where: { id: { in: cart.map((item) => item.productId) } },
    });

    for (const item of cart) {
        const product = products.find((p) => p.id === item.productId);
        if (!product) return { ok: false, reason: "PRODUCT_NOT_FOUND", productId: item.productId };
        if (product.stock < item.quantity) {
            return { ok: false, reason: "NO_STOCK", productName: product.name };
        }
    }
    const total = cart.reduce((sum, item) => {
            const product = products.find((p) => p.id === item.productId)!;
            return sum.plus(product.price.mul(item.quantity));
        }, new Prisma.Decimal(0));

        const purchase = await prisma.$transaction(async (tx) => {
            const created = await tx.purchase.create({
                data: {
                    userId,
                    total,
                    items: {
                        create: cart.map((item) => {
                            const product = products.find((p) => p.id === item.productId)!;
                            return {
                                productId: item.productId,
                                quantity: item.quantity,
                                price: product.price,
                            };
                        }),
                    },
                },
                include: { items: true },
            });

            for (const item of cart) {
                await tx.product.update({
                    where: { id: item.productId },
                    data: { stock: { decrement: item.quantity } },
                });
            }

            return created;
        });

        return { ok: true, purchase };
    }