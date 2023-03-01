import mongoose from "mongoose";
const Schema = mongoose.Schema;

const LocationSchema = new mongoose.Schema({
  country: { 
    type: String,
    required: true
  },
  state: { 
    type: String,
    required: true
  },
  city: { 
    type: String,
    required: true
  },
  postalCode: { 
    type: Number,
    required: true
  },
  courseId: [{ 
    type: Schema.ObjectId,
    ref: 'Course',
    required: true
  }],
}, { timestamps: true });

export default mongoose.model("Location", LocationSchema);
