import React, { useState } from 'react';

export default function CommentPin(props) {
  const [fillColor] = useState('#F38553');
  const onClick = (event) => {
	props.onSelect(props.number)
    event.stopPropagation();
  }
	
	return(
		<g onClick={onClick}>
			<circle cx={props.offsetLeft} cy={props.offsetTop} r="12" fill={fillColor} strokeWidth = {props.selected ? "3" : ""} stroke = {props.selected ? "green": ""}  />
			<text x={props.offsetLeft} y={props.offsetTop + 5} textAnchor="middle" fill="white" fontSize="15">{props.number.toString().padStart(2, 0)}</text>
		</g>
		);
}