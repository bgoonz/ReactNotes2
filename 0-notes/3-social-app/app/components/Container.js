import React, { useEffect } from "react";

function Container(props) {
  const widthClass = () => {
    return "container py-md-5 " + (props.wide ? "" : "container--narrow");
  };
  return <div className={widthClass()}>{props.children}</div>;
}

export default Container;
