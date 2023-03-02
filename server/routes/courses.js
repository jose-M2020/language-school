import express from "express";
import { 
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
} from "../controllers/courses.js";
import { roleAuthorization, verifyToken } from "../middlewares/auth.js";

const router = express.Router();

/* QUERIES   */
router.get("/", getCourses);
router.get("/:courseId", getCourseById);

/* MUTATIONS */
router.post("/", 
  verifyToken, 
  roleAuthorization(['admin']),
  createCourse
);
router.patch("/:courseId",
  verifyToken, 
  roleAuthorization(['admin']),
  updateCourse
);
router.delete("/:courseId",
  verifyToken,
  roleAuthorization(['admin']),
  deleteCourse
);

export default router;