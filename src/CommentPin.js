import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  selected: {
    "stroke-width": "3",
    stroke: "green"
  },
  numberLabel: {
    "pointer-events": "none",
    "font-size": "15",
    fill: "white",
    "text-anchor": "middle"
  }
}));

export default function CommentPin(props) {
  const classes = useStyles();
  const [fillColor] = useState('#F38553');
  const onClick = (event) => {
    props.onSelect(props.number)
    event.stopPropagation();
  }
	
	return(
		<g onClick={onClick}>
      <circle
        cx={props.offsetLeft}
        cy={props.offsetTop}
        r="12"
        fill={fillColor}
        className={props.selected ? classes.selected : ""} />
      <text
        x={props.offsetLeft}
        y={props.offsetTop + 5}
        className={classes.numberLabel}>{props.number.toString().padStart(2, 0)}</text>
		</g>
		);
}