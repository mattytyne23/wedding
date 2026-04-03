import React, { useState } from "react";
export function Upload({}) {

  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

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
    return data.secure_url;
  } catch (err) {
    console.error("Upload error:", err);
  }
};

 return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button onClick={handleUpload}>
        {loading ? "Uploading..." : "Upload"}
      </button>

      {url && (
        <div>
          <p>Uploaded image:</p>
          <img src={url} alt="uploaded" width="300" />
        </div>
      )}
    </div>
  );
}