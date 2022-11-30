import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  foreignObject: { overflow: "visible", width: "1px", height: "1px" },
  textarea: { cursor: "all-scroll" },
}));

const CommentTextArea = (props) => {
  const [offsetFromElementLeft, setOffsetFromElementLeft] = useState(null)
  const [offsetFromElementTop, setOffsetFromElementTop] = useState(null)
  const classes = useStyles();
  const onClick = (event) => {
    event.stopPropagation();
  };
  const handleDragStart = (event) => {
    setOffsetFromElementLeft((event.clientX + props.imgScrollRef.current.scrollLeft -
      props.imgParentRef.current.offsetLeft) - props.offsetLeft)

    setOffsetFromElementTop((event.clientY +
      props.imgScrollRef.current.scrollTop -
      props.imgParentRef.current.offsetTop) - props.offsetTop)
  }
  const handleDragEnd = (event) => {
    event.preventDefault();
    props.dragEnd(props.id, event, offsetFromElementLeft, offsetFromElementTop);
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
        onDragStart={handleDragStart}
        className={classes.textarea}
      />
    </foreignObject>
  );
};

export default CommentTextArea;
