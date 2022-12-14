import React from "react"

const CommentLine = (props) => {
    return (
        <g>
            <line x1={props.initialLeftOffset} y1={props.initialTopOffset} x2={props.finalLeftOffset} y2={props.finalTopOffset} stroke="rgb(255,0,0)" strokeWidth="2" />
        </g>
    )
}

export default CommentLine