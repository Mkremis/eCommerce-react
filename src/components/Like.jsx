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

  const [like, setLike] = useState(null);

  useEffect(() => {
    const isLike = likes.find((like) => String(like.prodId) === String(prodId));
    setLike(isLike);
  }, [likes]);

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
        const response = await likeRequests().deleteLike(prodId);
        if (response.status === 200) {
          setLike(null);
          const updatedLikes = likes.filter((like) => like.prodId !== prodId);
          setLikes(updatedLikes);
        }
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
        const response = await likeRequests().createLike(productLiked);
        if (response.status === 200) {
          setLike(prodId);
          setLikes([...likes, productLiked]);
        }
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
