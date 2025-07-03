const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Enable CORS for frontend requests
app.use(cors());

// Serve images statically
app.use("/images/grany", express.static(path.join(__dirname, "images/grany")));

// API route to get image filenames
app.get("/api/images", (req, res) => {
    const imageDir = path.join(__dirname, "images/grany");

    fs.readdir(imageDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: "Error reading directory" });
        }

        // Filter images only (JPG, PNG, JPEG, GIF)
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

        // Send filenames as an array
        res.json(imageFiles);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});