import { Router } from "express";
import productController from "./product.controller.js";
import { productSchema } from "./product.schema.js";
import validate from "../../middleware/validate.js";

const router = Router();

router.get("/", productController.index);
router.post("/", validate(productSchema), productController.create);
router.get("/:id", productController.read);
router.put("/:id", productController.update);
router.delete("/:id", productController.remove);

export default router;