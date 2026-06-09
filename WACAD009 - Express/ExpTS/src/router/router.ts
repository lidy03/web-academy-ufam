import { Router } from "express"
import mainController from "../controllers/main.js"
import productController from "../controllers/product.js"

const router = Router()

//Main Controller
router.get("/", mainController.index)
router.get("/about", mainController.about)
router.get("/bemvindo/:nome", mainController.welcome)
router.get("/loremipsum/:qtd", mainController.loremipsum)
router.get("/hb1", mainController.hb1)
router.get("/hb2", mainController.hb2)
router.get("/hb3", mainController.hb3)
router.get("/hb4", mainController.hb4)

//Products Controller
router.get ("/products/", productController.index);
router.all ("/products/create", productController.create)
router.all ("/products/update/:id", productController.update)
router.get ("/products/remove/:id", productController.remove)
router.get ("/products/read/:id", productController.read)

//Users Controller

export default router