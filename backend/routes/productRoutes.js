import express from "express";
// import products from "../data/products";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();
import {
  getProducts,
  getProductById,
  createProductReview,
  createProduct,
  updateProduct,
  deleteProduct,
  getTopProducts,
} from "../controllers/productController.js";

// // we're going to create an async handler because we're going to be using async await because the mongoose or the model methods, which are mongoose methods are are asynchronous.So we need to use a sync.
// router.get(
//   "/",
//   asyncHandler(async (req, res) => {
//     const products = await Product.find({}); //passing empty bcs we need all with out any filtering
//     // throw new Error("some error");
//     res.json(products);
//   })
// );
// router.get(
//   "/:id",
//   asyncHandler(async (req, res) => {
//     // const product = products.find((p) => p._id === req.params.id);
//     const product = await Product.findById(req.params.id);
//     if (product) {
//       return res.json(product);
//     } else {
//       res.status(404);
//       // json({ message: "product not found" });
//       throw new Error("Resource not found");
//     }
//   })
// );
router.route("/").get(getProducts).post(protect, admin, createProduct);
router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);
router.route("/:id/reviews").post(protect, createProductReview);
router.get("/top", getTopProducts);

export default router;
