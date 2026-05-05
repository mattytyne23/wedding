import React, { useState, useEffect } from "react";
export function Images({}) {
const [images, setImages] = useState([]);
const [loadedCount, setLoadedCount] = useState(0);
const [loading, setLoading] = useState(true);


  useEffect(() => {
    const API_URL = process.env.REACT_APP_API_URL;
    fetch(`${API_URL}/api/images/grid`)
      .then(res => res.json())
      .then(data => {
        setImages(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

const allLoaded = images.length > 0 && loadedCount === images.length;

  if (loading) {
    return <div className="container"><div className="card">Loading...</div></div>;
  }

  return (
    <div className="grid">
      {images.map((url, index) => (
        <img key={index} src={url} alt="grid item" />
      ))}
    </div>
  );

}