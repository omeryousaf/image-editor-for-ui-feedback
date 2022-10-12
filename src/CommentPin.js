import React, { useState } from 'react';

export const checkPinExistence = (commentPins, pinLeftOffset, pinTopOffset) => {
	if (commentPins.length === 0) {
	  return -1;
	}
	if (commentPins.length) {
	  const pinIndex = commentPins.findIndex((o) => {
		return (
		  pinLeftOffset >= o.props.offsetLeftStart &&
		  pinLeftOffset <= o.props.offsetLeftEnd &&
		  pinTopOffset >= o.props.offsetTopStart &&
		  pinTopOffset <= o.props.offsetTopEnd
		);
	  });
	  return pinIndex;
	}
  };

export default function CommentPin(props) {
	const [fillColor, setFillColor] = useState('#F38553');
	
	return(
		<g>
			<circle cx={props.offsetLeft} cy={props.offsetTop} r="12" fill={fillColor} stroke="black" stroke-width="3"/>
			<text x={props.offsetLeft} y={props.offsetTop + 5} text-anchor="middle" fill="white" font-size="15">{props.number.toString().padStart(2, 0)}</text>
		</g>
		);
}