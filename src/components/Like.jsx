import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";

const Like = ({ price, id, name, image }) => {
  const { likes, setLikes } = useContext(AuthContext);
  const initalLike = likes.find((obj) => obj.id === id) || null;
  const [like, setLike] = useState(initalLike);
  const product = { id, name, image, price };

  useEffect(() => {
    const updatedLikes = likes.find((obj) => obj.id === id) || null;
    if (updatedLikes) setLike(updatedLikes);
  }, [likes]);

  const handleLike = () => {
    if (like) {
      setLike(false);
      let newLikes = likes.filter(({ id }) => id !== product.id);
      setLikes(newLikes);
    } else {
      setLike(true);
      setLikes([...likes, product]);
    }
  };
  return (
    <button className="product-description__like" onClick={handleLike}>
      {like ? "❤" : "🤍"}
    </button>
  );
};
export default Like;
