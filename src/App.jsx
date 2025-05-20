import { useEffect, useState } from "react";

const APP = () => {
  const [images, setImages] = useState([]);
  const [clickedImages, setClickedImages] = useState(new Set());
  const [count, setCount] = useState(0)


  useEffect(() => {
    fetch(
      "https://api.giphy.com/v1/gifs/search?api_key=Fg8yJbBHQ65QIc0PQGNxjxpRx9CFbNpK&q=cats&limit=8",
      { mode: "cors" }
    )
      .then((response) => response.json())
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleClick = (id) => {
    if (!clickedImages.has(id)) {
      console.log(`Image ${id} clicked!`);
      setClickedImages((prev) => new Set(prev).add(id))
      setCount((count) => count + 1);
    }
  };

  return (
    <>
      <h1>Cat Game</h1>
      <div className="card">{count}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {images.map((gif) => (
          <img
            key={gif.id}
            src={gif.images.original.url}
            alt={gif.title}
            width="200"
            style={{ cursor: clickedImages.has(gif.id) ? "default" : "pointer", opacity: clickedImages.has(gif.id) ? 0.5 : 1 }}
            onClick={() => handleClick(gif.id)}
          />
        ))}
      </div>
    </>
  );
};

export default APP;
