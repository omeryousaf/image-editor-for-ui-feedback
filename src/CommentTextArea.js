import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  foreignObject: { overflow: "visible", width: "1px", height: "1px" },
  textarea: { cursor: "all-scroll" },
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
    <foreignObject
      x={props.offsetLeft}
      y={props.offsetTop}
      className={classes.foreignObject}
    >
      <textarea
        onClick={onClick}
        draggable="true"
        onDragEnd={handleDragEnd}
        className={classes.textarea}
      />
    </foreignObject>
  );
};

export default CommentTextArea;
