import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
export function Upload({}) {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
const [images, setImages] = useState([]);
const [urls, setUrls] = useState([]);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

    const handleClick = () => {
    fileInputRef.current.click();
  };

const handleUpload = async () => {
  if (images.length === 0) return;

  setLoading(true);

  try {
    const uploadedUrls = await Promise.all(
      images.map((img) => uploadImage(img))
    );

    setUrls(uploadedUrls);
    navigate("/images");
  } catch (err) {
    console.error(err);
  }

  setLoading(false);
};

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "dtojs0fca");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dtojs0fca/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  return data.secure_url; // important
};

 return (
    <div className="container">
      <div className="card">
        <h2>Add to our wedding album!</h2>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          multiple
          onChange={(e) => setImages(Array.from(e.target.files))}
          style={{ display: "none" }}
        />
{images.length === 0 && (
  <button className="btn" onClick={handleClick}>
    Pick image(s)
  </button>
)}

{images.length > 0 && (
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