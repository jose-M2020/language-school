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
import {
  getReservationByUser,
  createReservation,
  updateReservation,
  deleteReservation
} from "../controllers/reservations.js";
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
  roleAuthorization(['admin', 'student']),
  getCoursesByUser
);
router.get("/:userId/courses/:courseId",
  verifyToken, 
  roleAuthorization(['admin', 'student']),
  getCourseByUser
);

router.get("/:userId/reservations", 
  verifyToken,
  getReservationByUser
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

router.post("/:userId/reservations",
  verifyToken,
  roleAuthorization(['student', 'admin']),
  createReservation
);
router.patch("/:userId/reservations/:reservationId", 
  verifyToken, 
  roleAuthorization(['student','admin']),
  updateReservation
);
router.delete("/:userId/reservations/:reservationId",
  verifyToken, 
  roleAuthorization(['admin']),
  deleteReservation
);

export default router;