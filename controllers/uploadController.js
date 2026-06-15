const cloudinary = require("../config/cloudinary");
const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({message: "No file uploaded"});
        }
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "Sonia-Beauty"
        });
        res.json({
            imageUrl: result.secure_url
        });
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        res.status(500).json({message: error.message || "Internal Server Error"});
    }
};
module.exports = {uploadImage};