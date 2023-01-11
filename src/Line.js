import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    lineCursor: { cursor: "all-scroll" },
}));

const CommentLine = (props) => {
    const classes = useStyles();
    let diffInInitialLeft;
    let diffInInitialTop;
    let diffInFinalLeft;
    let diffInFinalTop;

    const onClick = (event) => {
        event.stopPropagation();
    };

    const handleDragStart = (event) => {
        // diffInInitialLeft is the distance between the draggingX point and startX (Initial X-axis)
        diffInInitialLeft = (event.clientX + props.imgScrollRef.current.scrollLeft -
            props.imgParentRef.current.offsetLeft) - props.initialLeftOffset;

        //diffInInitialTop is the distance between the draggingY point and startY (Initial Y-axis)
        diffInInitialTop = (event.clientY + props.imgScrollRef.current.scrollTop -
            props.imgParentRef.current.offsetTop) - props.initialTopOffset;

        // diffInFinalLeft is the distance between the dragging-end-X point and endX (Final X-axis).
        diffInFinalLeft = props.finalLeftOffset - (event.clientX + props.imgScrollRef.current.scrollLeft - props.imgParentRef.current.offsetLeft);

        // diffInFinalTop is the distance between the dragging-end-Y point and endY (Final Y-axis).
        diffInFinalTop = props.finalTopOffset - (event.clientY +
            props.imgScrollRef.current.scrollTop - props.imgParentRef.current.offsetTop);
    }
    const handleDragEnd = (event) => {
        event.preventDefault();

        // Updated Point of startX (Initial-X)
        const updatedInitialLeft =
            (event.clientX +
                props.imgScrollRef.current.scrollLeft -
                props.imgParentRef.current.offsetLeft) - diffInInitialLeft;

        // Updated Point of startY (Initial-Y)
        const updatedInitialTop =
            (event.clientY +
                props.imgScrollRef.current.scrollTop -
                props.imgParentRef.current.offsetTop) - diffInInitialTop;

        // Updated Point of EndX (Final-X)
        const updatedFinalLeft =
            (event.clientX +
                props.imgScrollRef.current.scrollLeft -
                props.imgParentRef.current.offsetLeft) + diffInFinalLeft;

        // Updated Point of EndY (Final-Y)
        const updatedFinalTop =
            (event.clientY +
                props.imgScrollRef.current.scrollTop -
                props.imgParentRef.current.offsetTop) + diffInFinalTop;

        props.dragEnd(props.id, updatedInitialLeft, updatedInitialTop, updatedFinalLeft, updatedFinalTop);


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