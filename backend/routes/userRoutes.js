import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  login,
} from "../controller/userController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", protect, admin, createUser);
router.route("/").get(protect, admin, getAllUsers);
router.route("/:id").delete(protect, admin, deleteUser);

export default router;
