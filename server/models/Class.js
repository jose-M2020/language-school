import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ClassSchema = new mongoose.Schema({
  topic: { 
    type: String,
    required: true
  },
  description: { 
    type: String
  },
  observation: { 
    type: String
  },
  teacherId: { 
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  courseId: { 
    type: Schema.ObjectId,
    ref: 'Course',
    required: true
  }
}, { timestamps: true });

export default mongoose.model("Class", ClassSchema);
