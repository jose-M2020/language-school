import Class from "../models/Class.js";
import Course from "../models/Course.js";

/* QUERIES   */

export const getClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    res.status(201).json(classes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getClassById = async (req, res) => {
  try {
    const { classId } = req.params;
    const schoolClass = await Class.findById(classId);
    
    if (!schoolClass) {
      return res.status(404)
                .json({error: "Class doesn't exist"})
    }

    res.status(201).json(schoolClass);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* MUTATIONS */

export const createClass = async (req, res) => {
  try {
    const {
      topic,
      description,
      observation,
      teacherId,
      courseId
    } = req.body;
    
    // const courseExists = await Course.findById(courseId);
    
    // if (!courseExists)
    //   return res.status(400).json({ error: "Course doesn't exist" });

    const newClass = new Class({
      topic,
      description,
      observation,
      teacherId,
      courseId
    });
    const savedClass = await newClass.save();

    res.status(201).json(savedClass);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateClass = async (req, res) => {
  try {
    const {
      body: {
        topic,
        description,
        observation,
        teacherId,
        courseId
      },
      params: { classId },
    } = req;
    
    if (!classId) {
      res
        .status(400)
        .send({
          status: "FAILED",
          data: { error: "Parameter classId can not be empty" },
        });
    }
    
    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      {
        $set: {
          topic,
          description,
          observation,
          teacherId,
          courseId
        },
      },
      { new: true }
    );

    if (!updatedClass) {
      return res.status(404)
                .json({error: "Class doesn't exist"})
    }

    res.status(201).json(updatedClass);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteClass = async (req, res) => {
  try {
    const { classId } = req.params;

    const deletedClass = await Class.findByIdAndDelete(classId);

    if (!deletedClass) {
      return res.status(404)
                .json({error: "Class doesn't exist"})
    }

    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
