import express from "express";
import { 
  getEvaluations,
  getEvaluationById,
  createEvaluation,
  updateEvaluation,
  deleteEvaluation
} from "../controllers/evaluations.js";

const router = express.Router();

/* QUERIES   */
router.get("/", getEvaluations);
router.get("/:evaluationId", getEvaluationById);

/* MUTATIONS */
router.post("/", createEvaluation);
router.patch("/:evaluationId", updateEvaluation);
router.delete("/:evaluationId", deleteEvaluation);

export default router;