import { type Purchase, type PurchaseItem} from "../../generated/prisma/client.js";

export type cartItem = Pick<PurchaseItem, "productId" | "quantity">;
export type addToCartDto = cartItem;

export type PurchaseResult =
    | { ok: true; purchase: Purchase }
    | { ok: false; reason: "EMPTY" }
    | { ok: false; reason: "PRODUCT_NOT_FOUND"; productId: string }
    | { ok: false; reason: "NO_STOCK"; productName: string };


