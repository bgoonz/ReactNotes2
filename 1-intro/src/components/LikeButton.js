import React, { useState } from "react";
import classes from "./Demo.module.css";
const LikeButton = () => {
  const [like, setLike] = useState(0);

  const incrementHandler = () => {
    setLike(like + 1);
  };
  const decrementHandler = () => {
    if (like > 0) {
      setLike(like - 1);
    } else {
      setLike(0);
    }
  };

  return (
    <div className={classes.display}>
      <button onClick={incrementHandler}>Like</button>
      <button onClick={decrementHandler}>Dislike</button>
      <div className={classes.border}>{like}</div>
    </div>
  );
};

export default LikeButton;
