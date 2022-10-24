import React, { useState } from 'react';

export default function CommentPin(props) {
  const [fillColor] = useState('#F38553');
  const onClick = (event) => {
    console.log(`existing pin clicked`);
    event.stopPropagation();
  }
	
	return(
		<g onClick={onClick}>
			<circle cx={props.offsetLeft} cy={props.offsetTop} r="12" fill={fillColor} />
			<text x={props.offsetLeft} y={props.offsetTop + 5} textAnchor="middle" fill="white" fontSize="15">{props.number.toString().padStart(2, 0)}</text>
		</g>
		);
}