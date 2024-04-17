import React from "react";

const DividerLine = ({ color = "#FF5151", width = "55px", height = 3 }) => {
  const style = {
    borderBottom: `${height}px solid ${color}`,
    width: width,
  };
  return (
    <div className="divider-line-container">
      <div className="dividerline" style={style}></div>
    </div>
  );
};

export default DividerLine;
