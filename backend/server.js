const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();


app.use(express.json());


app.use(cors({
    origin: "https://moodsnap-f7jcpgses-kadeejatuzaibas-projects.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// connect DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("DB Connected"))
    .catch(err => console.log("MongoDB connection error:", err));

const moodRoutes = require("./routes/moodRoutes");
app.use("/api/moods", moodRoutes);
const Mood = require("./models/Mood");
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server running"));
