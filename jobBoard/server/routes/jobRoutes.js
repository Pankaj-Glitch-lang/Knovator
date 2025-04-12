const express = require("express");
const Job = require("../models/jobs");
const router = express.Router();

// GET all jobs
router.get("/", async (req, res) => {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
});

// GET job by ID
router.get("/:id", async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        res.json(job);
    } catch {
        res.status(404).json({ message: "Job not found" });
    }
});

// POST new job
router.post("/", async (req, res) => {
    const { title, company, type, location, description } = req.body;
    if (!title || !company || !type || !location || !description) {
        
        return res.status(400).json({ message: "All fields are required" });
    }
    const job = new Job({ title, company, type, location, description });
    await job.save();
    res.status(201).json(job);
});

module.exports = router;
