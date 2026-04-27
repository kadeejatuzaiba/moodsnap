const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// connect DB
mongoose.connect("mongodb://localhost:27017/moodsnap")
    .then(() => console.log("DB Connected"))
    .catch(err => console.log("MongoDB connection error:", err));

// test route
app.get("/", (req, res) => {
    res.send("API running");
});
const moodRoutes = require("./routes/moodRoutes");
app.use("/api/moods", moodRoutes);
const Mood = require("./models/mood");
app.get("/api/stats", async (req, res) => {
    try {
        const { userId, role } = req.query;
        let matchStage = {};
        if (role === 'user' && userId) {
            matchStage = { userId };
        } else if (role !== 'admin') {
            return res.status(400).json({ error: "Invalid parameters" });
        }

        const stats = await Mood.aggregate([
            { $match: matchStage },
            { $group: { _id: "$mood", count: { $sum: 1 } } }
        ]);
        
        const formattedStats = stats.reduce((acc, curr) => {
            acc[curr._id] = curr.count;
            return acc;
        }, {});
        
        res.json(formattedStats);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

app.listen(5000, () => console.log("Server running"));