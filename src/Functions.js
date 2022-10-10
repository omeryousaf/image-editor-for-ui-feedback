export const checkCoordinates = (commentPins, pinLeftOffset, pinTopOffset) => {
  if (commentPins.length === 0) {
    return true;
  }
  if (commentPins.length) {
    const obj = commentPins.find(
      (o) =>
        o.props.offsetLeft === pinLeftOffset &&
        o.props.offsetTop === pinTopOffset
    );
    return Boolean(obj.keys);
  }
};
