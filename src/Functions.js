export const checkCoordinates = (commentPins, pinLeftOffset, pinTopOffset) => {

  if (commentPins.length === 0) {
    return true;
  }

  if (commentPins.length) {
    const obj = commentPins.find(
      (o) =>
      (pinLeftOffset >= o.props.offsetLeftStart && pinLeftOffset <= o.props.offsetLeftEnd) && (pinTopOffset >= o.props.offsetTopStart && pinTopOffset <= o.props.offsetTopEnd)
        // o.props.offsetLeft === pinLeftOffset &&
        // o.props.offsetTop === pinTopOffset
    );
    if(obj !== undefined){
      return false
    }
    else{
      return true
    }
  }
};
