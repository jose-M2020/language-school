import express from "express";
import { 
  getEvaluations,
  getEvaluationById,
  createEvaluation,
  updateEvaluation,
  deleteEvaluation
} from "../controllers/evaluations.js";
import { roleAuthorization, verifyToken } from "../middlewares/auth.js";

const router = express.Router();

/* QUERIES   */
router.get("/", getEvaluations);
router.get("/:evaluationId", getEvaluationById);

/* MUTATIONS */
router.post("/",
  verifyToken,
  roleAuthorization(['admin']),  
  createEvaluation
);
router.patch("/:evaluationId", 
  verifyToken, 
  roleAuthorization(['admin']), 
  updateEvaluation
);
router.delete("/:evaluationId",
  verifyToken,
  roleAuthorization(['admin']),
  deleteEvaluation
);

export default router;