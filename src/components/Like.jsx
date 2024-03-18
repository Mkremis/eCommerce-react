import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { likeRequests } from "../api/clientRequests";

const Like = ({
  prodId,
  prodName,
  prodGender,
  prodImage,
  prodPrice,
  priceCurrency,
  styles,
}) => {
  const { likes, setLikes } = useContext(AuthContext);
  const initialLike = likes.find((like) => like.id === prodId) || null;
  const [like, setLike] = useState(initialLike);

  useEffect(() => {
    function updateLike() {
      const updatedLike = likes.find((like) => like?.prodId === prodId);
      if (updatedLike) {
        setLike(updatedLike);
      }
    }
    updateLike();
  }, [likes]);

  const handleLike = async () => {
    if (like) {
      try {
        await likeRequests().deleteLike(prodId);
        setLike(null);
        const newLikes = likes.filter((like) => like.prodId !== prodId);
        setLikes(newLikes);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const productLiked = {
          prodId,
          prodName,
          prodGender,
          prodImage,
          prodPrice,
          priceCurrency,
        };
        await likeRequests().createLike(productLiked);
        setLike(prodId);
        const newLikes = [...likes, productLiked];
        setLikes(newLikes);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <button className="like-button" onClick={handleLike} style={styles}>
      {like ? "❤" : "🤍"}
    </button>
  );
};

export default Like;
