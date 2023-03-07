import Reservation from "../models/Reservation.js";
import Course from "../models/Course.js";

/* QUERIES   */

export const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(201).json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getReservationById = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const reservation = await Reservation.findById(reservationId);
    
    if (!reservation) {
      return res.status(404)
                .json({error: "Reservation doesn't exist"})
    }

    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getReservationByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const userReservations = await Reservation.find({studentId: userId});
    
    // if (!reservation) {
    //   return res.status(404)
    //             .json({error: "Reservation doesn't exist"})
    // }

    res.status(201).json(userReservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* MUTATIONS */

export const createReservation = async (req, res) => {
  try {
    const { body } = req;
    
    // const reservationExists = await Reservation.findById(reservationId);
    
    // if (!reservationExists)
    //   return res.status(400).json({ error: "Reservation doesn't exist" });
    
    const newReservations = Reservation.insertMany(body);
    // const savedReservation = await newReservation.save();

    res.status(201).json(newReservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateReservation = async (req, res) => {
  try {
    const {
      body: {
        classId,
        studentId,
        reservedHours,
        date,
        modality,
        status
      },
      params: { reservationId },
    } = req;
    
    if (!reservationId) {
      res
        .status(400)
        .send({
          status: "FAILED",
          data: { error: "Parameter reservationId can not be empty" },
        });
    }
    
    const updatedReservation = await Reservation.findByIdAndUpdate(
      reservationId,
      {
        $set: {
          classId,
          studentId,
          reservedHours,
          date,
          modality,
          status
        },
      },
      { new: true }
    );
    
    if (!updatedReservation) {
      return res.status(404)
                .json({error: "Reservation doesn't exist"})
    }

    res.status(201).json(updatedReservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteReservation = async (req, res) => {
  try {
    const { reservationId } = req.params;

    const deletedReservation = await Reservation.findByIdAndDelete(reservationId);

    if (!deletedReservation) {
      return res.status(404)
                .json({error: "Reservation doesn't exist"})
    }

    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
