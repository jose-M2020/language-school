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
import { roleAuthorization, verifyToken } from "../middlewares/auth.js";

const router = express.Router();

/* QUERIES   */
router.get("/", 
  verifyToken, 
  roleAuthorization(['admin', 'teacher']),
  getUsers
);
router.get("/:userId",
  verifyToken, 
  roleAuthorization(['admin, teacher, student']),  
  getUserById
);

router.get("/:userId/courses", 
  verifyToken, 
  roleAuthorization(['admin', 'alumno']),
  getCoursesByUser
);
router.get("/:userId/courses",
  verifyToken, 
  roleAuthorization(['admin', 'alumno']),
  getCourseByUser
);

/* MUTATIONS */
router.patch("/:userId",
  verifyToken, 
  roleAuthorization(['admin', 'student']),
  updateUser
);
router.delete("/:userId", 
  verifyToken, 
  roleAuthorization(['admin']),
  deleteUser
);

router.post("/:userId/courses",
  verifyToken,
  roleAuthorization(['admin']),
  addCourseToUser
);
router.patch("/:userId/courses/:courseId", 
  verifyToken, 
  roleAuthorization(['admin']),
  updateCourseByUser
);
router.delete("/:userId/courses/:courseId",
  verifyToken, 
  roleAuthorization(['admin']),
  deleteCourseByUser
);

export default router;