import express from "express";
import { 
  getClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass
} from "../controllers/classes.js";
import { roleAuthorization, verifyToken } from "../middlewares/auth.js";

const router = express.Router();

/* QUERIES   */
router.get("/",
  verifyToken,
  getClasses
);
router.get("/:classId",
  verifyToken,
  getClassById
);

/* MUTATIONS */
router.post("/", 
  verifyToken,
  roleAuthorization(['admin']),
  createClass
);
router.patch("/:classId", 
  verifyToken, 
  roleAuthorization(['admin']),
  updateClass
);
router.delete("/:classId", 
  verifyToken, 
  roleAuthorization(['admin']),
  deleteClass
);

export default router;