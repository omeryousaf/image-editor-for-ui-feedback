import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    lineCursor: { cursor: "all-scroll" },
}));

const CommentLine = (props) => {
    const classes = useStyles();
    const [offsetFromElementInitialLeft, setOffsetFromElementInitialLeft] = useState(null)
    const [offsetFromElementInitialTop, setOffsetFromElementInitialTop] = useState(null)
    const [offsetFromElementFinalLeft, setOffsetFromElementFinalLeft] = useState(null)
    const [offsetFromElementFinalTop, setOffsetFromElementFinalTop] = useState(null)

    const onClick = (event) => {
        console.log('click')
        event.stopPropagation();
    };
    const handleDragStart = (event) => {
        setOffsetFromElementInitialLeft((event.clientX + props.imgScrollRef.current.scrollLeft -
            props.imgParentRef.current.offsetLeft) - props.initialLeftOffset)

        setOffsetFromElementInitialTop((event.clientY +
            props.imgScrollRef.current.scrollTop -
            props.imgParentRef.current.offsetTop) - props.initialTopOffset)

        setOffsetFromElementFinalLeft(props.finalLeftOffset - (event.clientX + props.imgScrollRef.current.scrollLeft - props.imgParentRef.current.offsetLeft))

        setOffsetFromElementFinalTop(props.finalTopOffset - (event.clientY +
            props.imgScrollRef.current.scrollTop - props.imgParentRef.current.offsetTop))
    }
    const handleDragEnd = (event) => {
        event.preventDefault();
        props.dragEnd(props.id, event, offsetFromElementInitialLeft, offsetFromElementInitialTop, offsetFromElementFinalLeft, offsetFromElementFinalTop);
    };
    return (
        <g>
            <line
                x1={props.initialLeftOffset}
                y1={props.initialTopOffset}
                x2={props.finalLeftOffset}
                y2={props.finalTopOffset}
                stroke="rgb(255,0,0)"
                strokeWidth="9"
                draggable="true"
                className={classes.lineCursor}
                onClick={onClick}
                onDragEnd={handleDragEnd}
                onDragStart={handleDragStart}
            />
        </g>
    )
}

export default CommentLine