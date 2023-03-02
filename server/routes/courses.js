import express from "express";
import { 
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
} from "../controllers/courses.js";

const router = express.Router();

/* QUERIES   */
router.get("/", getCourses);
router.get("/:courseId", getCourseById);

/* MUTATIONS */
router.post("/", createCourse);
router.patch("/:courseId", updateCourse);
router.delete("/:courseId", deleteCourse);

export default router;