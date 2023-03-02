import Course from "../models/Course.js";
import Evaluation from "../models/Evaluation.js";

/* QUERIES   */

export const getEvaluations = async (req, res) => {
  try {
    const evaluations = await Evaluation.find();
    res.status(201).json(evaluations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getEvaluationById = async (req, res) => {
  try {
    const { evaluationId } = req.params;
    const evaluation = await Evaluation.findById(evaluationId);
    res.status(201).json(evaluation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* MUTATIONS */

export const createEvaluation = async (req, res) => {
  try {
    const {
      name,
      description,
      courseId
    } = req.body;
    
    const courseExists = await Course.findById(courseId);
    
    if (!courseExists)
      return res.status(400).json({ error: "Course doesn't exist" });

    const newEvaluation = new Evaluation({
      name,
      description,
      courseId
    });
    const savedEvaluation = await newEvaluation.save();

    res.status(201).json(savedEvaluation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateEvaluation = async (req, res) => {
  try {
    const {
      body: {
        name,
        description,
        price,
        discount,
        modality,
        levels
      },
      params: { evaluationId },
    } = req;
    
    if (!evaluationId) {
      res
        .status(400)
        .send({
          status: "FAILED",
          data: { error: "Parameter evaluationId can not be empty" },
        });
    }
    
    const updatedEvaluation = await Evaluation.findByIdAndUpdate(
      evaluationId,
      {
        $set: {
          name,
          description,
          price,
          discount,
          modality,
          levels
        },
      },
      { new: true }
    );
      
    if (!updatedEvaluation) {
      const error = new Error("Evaluation doesn't exists");
      error.status = 404;
      throw error;
    }

    res.status(201).json(updatedEvaluation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteEvaluation = async (req, res) => {
  try {
    const { evaluationId } = req.params;

    const deletedEvaluation = await Evaluation.findByIdAndDelete(evaluationId);

    if (!deletedEvaluation) {
      const error = new Error("Evaluation doesn't exists");
      error.status = 404;
      throw error;
    }

    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
