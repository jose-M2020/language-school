import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  photo: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
    required: true
  },
  address: {
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
  },
  courses: [
    {
      _id: {
        type: String,
        required: true
      },
      courseId: {
        type: Schema.ObjectId,
        ref: 'Course',
        required: true
      },
      evaluations: [{
        evaluationId: {
          type: Schema.ObjectId,
          ref: 'Evaluation',
          required: true
        },
        grade: {
          type: Number,
          default: 0,
          min: 0,
          max: 10 
        },
        date: Date
      }],
      currentModality: {
        type: String,
        enum: ['Online', 'In-person'],
        required: true
      },
      currentLevel: {
        type: String,
        required: true
      },
      completed: {
        type: Boolean,
        default: false
      },
      startDate: {
        type: Date,
        required: true
      },
      endDate: {
        type: Date,
      },
      grade: {
        type: Number,
        default: 0,
        min: 0,
        max: 10 
      },
      hoursAvailable: {
        type: Number,
      },
      locationId: {
        type: Schema.ObjectId,
        ref: 'Location',
        required: true
      }
    }
  ]
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
