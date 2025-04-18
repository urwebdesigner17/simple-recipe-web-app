import express from "express";

import { createProduct, deleteProduct, getProducts, updateProduct, getProductById } from "../controllers/product.controller.js"; //the getProductById is for deletion

const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
//additional to delete
router.get("/:id", getProductById);

export default router;
