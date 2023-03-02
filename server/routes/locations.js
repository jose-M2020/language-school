import express from "express";
import { 
  getLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation
} from "../controllers/locations.js";
import { roleAuthorization, verifyToken } from "../middlewares/auth.js";

const router = express.Router();

/* QUERIES   */
router.get("/", getLocations);
router.get("/:locationId", getLocationById);

/* MUTATIONS */
router.post("/", 
  verifyToken,
  roleAuthorization(['admin']),
  createLocation
);
router.patch("/:locationId", 
  verifyToken, 
  roleAuthorization(['admin']),
  updateLocation
);
router.delete("/:locationId", 
  verifyToken, 
  roleAuthorization(['admin']),
  deleteLocation
);

export default router;