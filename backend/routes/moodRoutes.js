const express = require("express");
const router = express.Router();
const Mood = require("../models/Mood");

// create mood
router.post("/", async (req, res) => {
    try {
        const { userId, mood, note } = req.body;
        const newMood = new Mood({ userId, mood, note });
        await newMood.save();
        res.status(201).json(newMood);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// get moods
router.get("/", async (req, res) => {
    try {
        const { userId, role } = req.query;
        if (role === 'admin') {
            const moods = await Mood.find().sort({ createdAt: -1 });
            return res.json(moods);
        } else if (role === 'user' && userId) {
            const moods = await Mood.find({ userId }).sort({ createdAt: -1 }).limit(10);
            return res.json(moods);
        } else {
            return res.status(400).json({ error: "Invalid role or missing userId" });
        }
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// delete mood
router.delete("/:id", async (req, res) => {
    try {
        const { role } = req.query;
        if (role !== 'admin') {
            return res.status(403).json({ error: "Access denied" });
        }
        await Mood.findByIdAndDelete(req.params.id);
        res.json({ message: "Mood deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;