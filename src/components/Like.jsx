import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { likesUpdate } from "../api/clientRequests";

const Like = ({ price, id, name, image, styles, gender }) => {
  const { likes, setLikes, auth: user } = useContext(AuthContext);

  const initalLike = likes.find((obj) => obj.id === id) || null;
  const [like, setLike] = useState(initalLike);
  const product = { id, name, image, price, gender };

  useEffect(() => {
    const updatedLikes = likes.find((obj) => obj.id === id) || null;
    if (updatedLikes) setLike(updatedLikes);
  }, [likes]);

  const handleLike = () => {
    if (like) {
      setLike(false);
      const newLikes = likes.filter(({ id }) => id !== product.id);
      setLikes(newLikes);
      likesUpdate(newLikes, user);
    } else {
      setLike(true);
      const newLikes = [...likes, product];
      setLikes(newLikes);
      likesUpdate(newLikes, user);
    }
  };
  return (
    <button className="like-button" onClick={handleLike} style={styles}>
      {like ? "❤" : "🤍"}
    </button>
  );
};
export default Like;
