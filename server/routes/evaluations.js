import express from "express";

const router = express.Router();

/* QUERIES   */
router.get("/", () => {greeting: 'hello'});
router.get("/:id", () => {greeting: 'hello'});

/* MUTATIONS */
router.post("/", () => {greeting: 'hello'});
router.put("/:id", () => {greeting: 'hello'});
router.delete("/:id", () => {greeting: 'hello'});

export default router;