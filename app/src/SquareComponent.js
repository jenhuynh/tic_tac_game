import React from "react";

const SquareComponent = (props) => {
  // if false it's square, if true it's props-square
  const classes = props.className ? `${props.className} square` : `square`;
  return (
    <button
      // if false, it's white, if it's 'X', it's aqua
      className={classes + (props.state === "X" ? ` fc-aqua` : ` fc-white`)}
      onClick={() => props.onClick(props.index)}
    >
      {props.state}
    </button>
  );
};
export default SquareComponent;
