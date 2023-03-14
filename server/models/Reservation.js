import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ReservationSchema = new mongoose.Schema({
  classId: { 
    type: Schema.ObjectId,
    ref: 'Class'
  },
  studentId: { 
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  reservedHours: {
    type: Number
  },
  date: {
    type: String,
    required: true
  },
  modality: {
    type: String,
    enum: ['Online', 'In-person'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'attended', 'cancelled'],
    default: 'pending'
  },
}, { timestamps: true });

export default mongoose.model("Reservation", ReservationSchema);
