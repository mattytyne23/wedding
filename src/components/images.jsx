import React, { useState, useEffect } from "react";
export function Images({}) {
    const [images, setImages] = useState([]);

    useEffect(() => {
        console.log('test')
        fetch("http://localhost:8080/api/images")
        .then(res => res.json())
        .then(data => setImages(data));
    }, []);

    return (
        <div>
        {images.map(img => (
            <img
            key={img.public_id}
            src={img.secure_url}
            alt=""
            width="200"
            />
        ))}
        </div>
    )

}