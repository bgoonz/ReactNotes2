import React from "react";

function VerticalSpace({ amount, unit }) {
  const verticalSpaceStyle = {
    height: `${amount}${unit}`,
  };

  return <div style={verticalSpaceStyle}></div>;
}

export default VerticalSpace;
