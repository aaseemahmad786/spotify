const musicModel = require('../models/music.model');
const jwt = require("jsonwebtoken");
const { uploadFile } = require('../services/storage.service');

async function createMusic(req, res) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "artist") {
            return res.status(403).json({ message: "You are not allowed to create music" });
        }

        const { title } = req.body;
        const file = req.file;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        if (!file) {
            return res.status(400).json({ message: "File is required" });
        }

        const result = await uploadFile(file);

        const music = await musicModel.create({
            uri: result.url,
            title,
            artist: decoded.id,
        });

        res.status(201).json({
            message: "Music created successfully",
            music: {
                id: music._id,
                uri: music.uri,
                title: music.title,
                artist: music.artist
            }
        });

    } catch (error) {
        console.log("Error in creating music:", error);

        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const response = { message: "Failed to create music" };

        if (process.env.NODE_ENV !== "production") {
            response.error = error.message;
        }

        return res.status(500).json(response);
    }
}

async function getAllMusic(req, res) {
    try {
        const music = await musicModel.find().populate('artist', 'username');
        res.status(200).json(music);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch music", error: error.message });
    }
}

module.exports = { createMusic, getAllMusic };

