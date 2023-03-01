import mongoose from "mongoose";
const Schema = mongoose.Schema;

const EvaluationSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true
  },
  description: { 
    type: String
  },
  courseId: { 
    type: Schema.ObjectId,
    ref: 'Course',
    required: true
  },
}, { timestamps: true });

export default mongoose.model("Evaluation", EvaluationSchema);
