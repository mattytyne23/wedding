import React, { useState, useEffect } from "react";
export function Images({}) {
const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SECRET_KEY}/api/images/grid`)
      .then(res => res.json())
      .then(data => setImages(data));
  }, []);

  return (
    <div className="grid">
      {images.map((url, index) => (
        <img key={index} src={url} alt="grid item" />
      ))}
    </div>
  );

}