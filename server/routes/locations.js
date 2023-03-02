import express from "express";
import { 
  getLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation
} from "../controllers/locations.js";

const router = express.Router();

/* QUERIES   */
router.get("/", getLocations);
router.get("/:locationId", getLocationById);

/* MUTATIONS */
router.post("/", createLocation);
router.patch("/:locationId", updateLocation);
router.delete("/:locationId", deleteLocation);

export default router;