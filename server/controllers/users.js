import User from "../models/User.js";
import { v4 as uuidv4 } from 'uuid';

/* QUERIES   */

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
                            // .populate("courses");

    res.status(201).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCoursesByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId, 'courses');
    
    res.status(201).json(user.courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCourseByUser = async (req, res) => {
  try {
    const { userId, courseId } = req.params;

    const course =  await User.findOne(
      {_id: userId},
      {courses: {
        '$elemMatch': {
          _id: courseId
        }
      }}
    )
    
    res.status(201).json(course.courses[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* MUTATIONS */

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      const error = new Error("User doesn't exists");
      error.status = 404;
      throw error;
    }

    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const {
      body: {
        firstName,
        lastName,
        phone,
        email,
        password,
        photo,
        role,
        address
      },
      params: { userId },
    } = req;
    
    if (!userId) {
      res
        .status(400)
        .send({
          status: "FAILED",
          data: { error: "Parameter userId can not be empty" },
        });
    }
    
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          firstName,
          lastName,
          phone,
          email,
          password,
          photo,
          role,
          address
        },
      },
      { new: true }
    );

    res.status(201).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addCourseToUser = async (req, res) => {
  try {
    const {
      body: {
        courseId,
        currentModality,
        currentLevel,
        startDate,
        endDate,
        hoursAvailable,
        locationId
      },
      params: { userId },
    } = req;

    const _id = uuidv4();
    const addedCourse = await User.findByIdAndUpdate(
      userId,
      { $push: { 
          courses: {
            _id,
            courseId,
            currentModality,
            currentLevel,
            startDate,
            endDate,
            hoursAvailable,
            locationId
          } 
        } 
      }
    )

    if (!addedCourse) {
      const error = new Error("CourseId doesn't exist");
      error.status = 404;
      throw error;
    }

    res.status(201).json(addedCourse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateCourseByUser = async (req, res) => {
  try {
    const {
      body: {
        refCourseId,
        currentModality,
        currentLevel,
        completed,
        startDate,
        endDate,
        grade,
        hoursAvailable,
        locationId
      },
      params: { userId, courseId },
    } = req;

    if (!userId && !courseId) {
      return res
        .status(400)
        .send({
          status: "FAILED",
          data: { error: "Parameter userId and courseId can not be empty" },
        });
    }

    const updatedCourse = await User.findByIdAndUpdate(
      userId,
      { 
        $set: {
          "courses.$[elem].courseId": refCourseId,
          "courses.$[elem].currentModality": currentModality,
          "courses.$[elem].currentLevel": currentLevel,
          "courses.$[elem].completed": completed,
          "courses.$[elem].startDate": startDate,
          "courses.$[elem].endDate": endDate,
          "courses.$[elem].grade": grade,
          "courses.$[elem].hoursAvailable": hoursAvailable,
          "courses.$[elem].locationId": locationId
        }
      },
      { arrayFilters: [ 
        { "elem._id": courseId } 
      ]}
    );
    
    res.status(201).json(updatedCourse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteCourseByUser = async (req, res) => {
  try {
    const { userId, courseId } = req.params;
    
    const deletedCourse = await User.findByIdAndUpdate(
      userId,
      { 
        $pull: {
          courses: { _id: courseId }
        }
      } 
    );

    if (!deletedCourse) {
      const error = new Error("User doesn't exist");
      error.status = 404;
      throw error;
    }

    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
