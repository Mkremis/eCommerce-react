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
  const { auth: user, likes, setLikes } = useContext(AuthContext);

  const [like, setLike] = useState(null);

  useEffect(() => {
    const isLike = likes.find((like) => String(like.prodId) === String(prodId));
    setLike(isLike);
  }, [likes]);

  useEffect(() => {
    function updateLike() {
      const updatedLike = likes.find(
        (like) => String(like?.prodId) === String(prodId)
      );
      if (updatedLike) {
        setLike(updatedLike);
      }
    }
    updateLike();
  }, [likes]);

  const handleLike = async () => {
    if (like) {
      try {
        if (user) {
          const deleteUserLikeResponse = await likeRequests().deleteLike(
            prodId
          );
          console.log(deleteUserLikeResponse);
          if (deleteUserLikeResponse.status === 200) {
            setLike(null);
            const updatedLikes = likes.filter(
              (like) => String(like.prodId) !== String(prodId)
            );
            setLikes(updatedLikes);
          }
        } else {
          setLike(null);
          const updatedLikes = likes.filter(
            (like) => String(like.prodId) !== String(prodId)
          );
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
        if (user) {
          const createUserLikeResponse = await likeRequests().createLike(
            productLiked
          );
          if (createUserLikeResponse.status === 200) {
            setLike(prodId);
            setLikes([...likes, productLiked]);
          }
        } else {
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
