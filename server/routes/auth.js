import express from "express";

const router = express.Router();

/* MUTATIONS */
router.post("/login", (req, res) =>res.json({greeting: 'hello'}));
router.post("/register", () => {greeting: 'hello'});
router.post("/resetPassword", () => {greeting: 'hello'});

export default router;