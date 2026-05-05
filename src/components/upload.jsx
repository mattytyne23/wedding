import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
export function Upload({}) {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

    const handleClick = () => {
    fileInputRef.current.click();
  };

const handleUpload = async () => {
    if (!image) return;

    setLoading(true);
    const uploadedUrl = await uploadImage(image);
    setUrl(uploadedUrl);
    setLoading(false);
  };

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "dtojs0fca");

  try {
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dtojs0fca/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return navigate("/images");
  } catch (err) {
    console.error("Upload error:", err);
  }
};

 return (
    <div className="container">
      <div className="card">
        <h2>Add to our wedding album!</h2>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          style={{ display: "none" }}
        />
      {!image && (
      <button className="btn" onClick={handleClick}>
        Pick image(s)
      </button>
      )}

      
        <br/>
        {image && (
        <button className="btn" onClick={handleUpload}>
          {loading ? "Uploading..." : "Upload"}
        </button>
        )}


        {url && (
          <div>
            <p>Uploaded image:</p>
            <img src={url} alt="uploaded" width="200" />
          </div>
        )}
      </div>

    </div>
  );
}