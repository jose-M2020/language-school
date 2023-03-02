import express from "express";
import { 
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getCoursesByUser,
  getCourseByUser,
  addCourseToUser,
  updateCourseByUser,
  deleteCourseByUser
} from "../controllers/users.js";

const router = express.Router();

/* QUERIES   */
router.get("/", getUsers);
router.get("/:userId", getUserById);

router.get("/:userId/courses", getCoursesByUser);
router.get("/:userId/courses", getCourseByUser);

/* MUTATIONS */
router.patch("/:userId", updateUser);
router.delete("/:userId", deleteUser);

router.post("/:userId/courses", addCourseToUser);
router.patch("/:userId/courses/:courseId", updateCourseByUser);
router.delete("/:userId/courses/:courseId", deleteCourseByUser);

export default router;