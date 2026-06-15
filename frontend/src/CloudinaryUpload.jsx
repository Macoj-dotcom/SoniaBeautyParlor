import { useState } from "react";
const CloudinaryUpload = ({ onUploadSuccess }) => {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleUpload = async () => {
        if (!image) return alert("Please select an image");

        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
        try {
            setLoading(true);
            const res = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }   
            );
            const data = await res.json();
            if (onUploadSuccess) {
                onUploadSuccess(data.secure_url);
            }
            alert("Image upload successfully");
        } catch (error) {
            console.error(error);
            alert("Upload failed");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <input type="file" accept="image/*" onChange={(e) => 
                setImage(e.target.files[0])} 
            />
            <button onClick={handleUpload} disabled={loading}>
                {loading ? "Uploading...": "UploadImage"}
            </button>
        </div>
    );
};
export default CloudinaryUpload;