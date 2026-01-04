import { Router } from "express";
import { productController } from "../controllers/product.controller";

const router = Router();

router.post("/products", productController.create);
router.get("/products", productController.getAll);
router.get("/products/:id", productController.getById);
router.put("/products/:id", productController.update);
router.delete("/products/:id", productController.delete);

export default router;
