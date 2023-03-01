import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ClassSchema = new mongoose.Schema({
  topic: { 
    type: String,
    required: true
  },
  observation: { 
    type: String
  },
  reservedHours: { 
    type: Number,
    default: 1
  },
  date: { 
    type: Date,
    required: true
  },
  modality: {
    type: String,
    enum: ['remote', 'face-to-face'],
    required: true
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
  },
  students: [
    { 
      userId: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
      },
      attended: Boolean
    }
  ],
}, { timestamps: true });

export default mongoose.model("Class", ClassSchema);
