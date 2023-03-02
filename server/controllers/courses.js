import Course from "../models/Course.js";

/* QUERIES   */

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(201).json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* MUTATIONS */

export const createCourse = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discount,
      modality,
      levels
    } = req.body;

    const newCourse = new Course({
      name,
      description,
      price,
      discount,
      modality,
      levels
    });
    const savedCourse = await newCourse.save();

    res.status(201).json(savedCourse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateCourse = async (req, res) => {
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
      params: { courseId },
    } = req;
    
    if (!courseId) {
      return res
        .status(400)
        .send({
          status: "FAILED",
          data: { error: "Parameter courseId can not be empty" },
        });
    }
    
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
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
      
    if (!updatedCourse) {
      const error = new Error("Course doesn't exists");
      error.status = 404;
      throw error;
    }

    res.status(201).json(updatedCourse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const deletedCourse = await Course.findByIdAndDelete(courseId);

    if (!deletedCourse) {
      const error = new Error("Course doesn't exists");
      error.status = 404;
      throw error;
    }

    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
