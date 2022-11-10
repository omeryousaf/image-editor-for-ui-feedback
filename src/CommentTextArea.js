import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  flow: { overflow: "visible" },
}));

const CommentTextArea = (props) => {
  const classes = useStyles();
  const onClick = (event) => {
    event.stopPropagation();
  };
  const handleDragEnd = (event) => {
    event.preventDefault();
    props.dragEnd(props.number, event);
  };
  return (
    <foreignObject x={props.offsetLeft} y={props.offsetTop} className={classes.flow}>
      <textarea onClick={onClick} draggable="true" onDragEnd={handleDragEnd} />
    </foreignObject>
  );
};

export default CommentTextArea;
