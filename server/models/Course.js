import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true
  },
  description: { 
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number
  },
  modality: {
    type: [String],
    enum: ['Online', 'In-person'],
    required: true
  },
  levels: [{
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
    }
  }]
}, { timestamps: true });

export default mongoose.model("Course", CourseSchema);
