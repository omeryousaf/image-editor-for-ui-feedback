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
        
        diffInInitialLeft = (event.clientX + props.imgScrollRef.current.scrollLeft -
            props.imgParentRef.current.offsetLeft) - props.initialLeftOffset;

        diffInInitialTop = (event.clientY + props.imgScrollRef.current.scrollTop -
            props.imgParentRef.current.offsetTop) - props.initialTopOffset;

        diffInFinalLeft = props.finalLeftOffset - (event.clientX + props.imgScrollRef.current.scrollLeft - props.imgParentRef.current.offsetLeft);

        diffInFinalTop = props.finalTopOffset - (event.clientY +
            props.imgScrollRef.current.scrollTop - props.imgParentRef.current.offsetTop);
    }
    const handleDragEnd = (event) => {
        event.preventDefault();

        const updatedInitialLeft =
            (event.clientX +
                props.imgScrollRef.current.scrollLeft -
                props.imgParentRef.current.offsetLeft) - diffInInitialLeft;

        const updatedInitialTop =
            (event.clientY +
                props.imgScrollRef.current.scrollTop -
                props.imgParentRef.current.offsetTop) - diffInInitialTop;

        const updatedFinalLeft =
            (event.clientX +
                props.imgScrollRef.current.scrollLeft -
                props.imgParentRef.current.offsetLeft) + diffInFinalLeft;

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