import Course from "../models/Course.js";
import Location from "../models/Location.js";

/* QUERIES   */

export const getLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(201).json(locations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getLocationById = async (req, res) => {
  try {
    const { locationId } = req.params;
    const location = await Location.findById(locationId);
    res.status(201).json(location);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* MUTATIONS */

export const createLocation = async (req, res) => {
  try {
    const {
      country,
      state,
      city,
      postalCode,
      courseId
    } = req.body;
    
    // const courseExists = await Course.findById(courseId);
    
    // if (!courseExists)
    //   return res.status(400).json({ error: "Course doesn't exist" });

    const newLocation = new Location({
      country,
      state,
      city,
      postalCode,
      courseId
    });
    const savedLocation = await newLocation.save();

    res.status(201).json(savedLocation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateLocation = async (req, res) => {
  try {
    const {
      body: {
        country,
        state,
        city,
        postalCode,
        courseId
      },
      params: { locationId },
    } = req;
    
    if (!locationId) {
      res
        .status(400)
        .send({
          status: "FAILED",
          data: { error: "Parameter locationId can not be empty" },
        });
    }
    
    const updatedLocation = await Location.findByIdAndUpdate(
      locationId,
      {
        $set: {
          country,
          state,
          city,
          postalCode,
          courseId
        },
      },
      { new: true }
    );
      
    if (!updatedLocation) {
      const error = new Error("Location doesn't exist");
      error.status = 404;
      throw error;
    }

    res.status(201).json(updatedLocation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteLocation = async (req, res) => {
  try {
    const { locationId } = req.params;

    const deletedEvaluation = await Location.findByIdAndDelete(locationId);

    if (!deletedEvaluation) {
      const error = new Error("Location doesn't exist");
      error.status = 404;
      throw error;
    }

    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
