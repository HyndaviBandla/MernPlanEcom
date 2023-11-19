import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router
  .route("/") //"/api/users"
  .post(registerUser)
  .get(protect, admin, getUsers);

//login user
router.route("/login").post(authUser);
//logout user
router.route("/logout").post(logoutUser);
router
  .route("/profile") //"/api/users/profile"
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
