import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CommentPin from "./CommentPin.js";
import CommentTextArea from "./CommentTextArea.js";

const useStyles = makeStyles((theme) => ({
  draftWrapper: {
    width: "90vw",
    "--heightUnderTopNav": "calc(100vh - 64px)",
    height: "calc(var(--heightUnderTopNav) * 0.9)",
    background: "green",
    "--unusedHeightBelowTopNav": "calc(var(--heightUnderTopNav) * 0.1)",
    "margin-top": "calc(var(--unusedHeightBelowTopNav) / 2)",
    "margin-left": "calc(10vw / 2)",
    display: "flex",
    "flex-direction": "column",
    "--containerHeaderHeight": "20px",
  },
  feedbackContainerHeader: {
    height: "var(--containerHeaderHeight)",
  },
  draftBody: {
    display: "grid",
    "grid-template-columns": ".5fr 5fr .5fr",
    width: "100%",
    height: "calc(100% - var(--containerHeaderHeight))",
  },
  flexContainer: {
    display: "flex",
  },
  cyan: {
    background: "cyan",
  },
  magenta: {
    background: "magenta",
  },
  restrictDimensions: {
    "max-height": "2000px",
    "max-width": "2000px",
  },
  displayFlex: {
    display: "flex",
  },
  scrollAuto: {
    overflow: "auto",
  },
  centerAlign: {
    margin: "auto",
  },
  imageContainer: {
    position: "relative",
    "& .overlay": {
      position: "absolute",
      top: "0",
      left: "0",
    },
  },
  displayBlock: {
    display: "block",
  },
}));

export default function Feedback(argument) {
  const classes = useStyles();
  const [imagePath, setImagePath] = useState(null);
  const [commentPins, setCommentPins] = useState([]);
  const [pinUniqueKey, setPinUniqueKey] = useState(0);
  const [selectedPointer, setSelectedPointer] = useState("Textarea");
  const imageParentRef = useRef(null);
  const imageScrollOwnerRef = useRef(null);
  const onFileChange = (event) => {
    console.log('On file Change');
    setCommentPins([]);
    setImagePath(URL.createObjectURL(event.target.files[0]));
  };
  useEffect(() => {console.log(selectedPointer)}, [selectedPointer]);
  const onClickToAddNewPin = (event) => {
    if (commentPins.length > 0) {
      var result = commentPins.map((pin) =>
        pin.selected === true ? { ...pin, selected: false } : pin
      );
      setCommentPins(result);
    }
    // pin left offset = x-offset-of-click-from-viewport-left + image-horizontal-scroll-offset-from-left - left-offset-of-image-horizontal-scroll-from-its-start
    const newPinLeftOffset =
      event.clientX +
      imageScrollOwnerRef.current.scrollLeft -
      imageParentRef.current.offsetLeft;
    // pin top offset = y-offset-of-click-from-viewport-top + vertical-scroll-offset-of-image - top-offset-of-image-vertical-scroll-from-its-start
    const newPinTopOffset =
      event.clientY +
      imageScrollOwnerRef.current.scrollTop -
      imageParentRef.current.offsetTop;
    const newPin = {
      leftOffset: newPinLeftOffset,
      topOffset: newPinTopOffset,
      key: `pin-${pinUniqueKey.toString()}`,
      number: pinUniqueKey + 1,
      selected: true,
    };
    setCommentPins((oldArray) => [...oldArray, newPin]);
    // increment pin key to be used for identifying next pin uniquely for the rendering loop
    setPinUniqueKey(pinUniqueKey + 1);
  };

  const makeSelected = (pinNumber) => {
    const result = commentPins.map((pin) =>
      pin.number === pinNumber
        ? { ...pin, selected: true }
        : { ...pin, selected: false }
    );
    setCommentPins(result);
  };

  const onDragEnd = (pinNumber, event) => {
    // pin left offset = x-offset-of-click-from-viewport-left + image-horizontal-scroll-offset-from-left - left-offset-of-image-horizontal-scroll-from-its-start
    const newPinLeftOffset =
      event.clientX +
      imageScrollOwnerRef.current.scrollLeft -
      imageParentRef.current.offsetLeft;
    // pin top offset = y-offset-of-click-from-viewport-top + vertical-scroll-offset-of-image - top-offset-of-image-vertical-scroll-from-its-start
    const newPinTopOffset =
      event.clientY +
      imageScrollOwnerRef.current.scrollTop -
      imageParentRef.current.offsetTop;

    const result = commentPins.map((pin) =>
      pin.number === pinNumber
        ? { ...pin, leftOffset: newPinLeftOffset, topOffset: newPinTopOffset }
        : { ...pin }
    );
    setCommentPins(result);
  };
  return (
    <div className={classes.draftWrapper}>
      <div className={classes.feedbackContainerHeader}>
        <input type="file" onChange={onFileChange} />
      </div>
      <div className={classes.draftBody}>
        <div className={classes.magenta}>
          <select
            name="selectedPointer"
            id="selectedPointer"
            onChange={(e) => setSelectedPointer(e.target.value)}
            defaultValue={selectedPointer}
          >
            <option value="Textarea">Textarea</option>
            <option value="Pin">Pin</option>
          </select>
        </div>
        <div
          className={`${classes.cyan} ${classes.displayFlex} ${classes.scrollAuto}`}
          ref={imageScrollOwnerRef}
        >
          {imagePath ? (
            <div
              className={`${classes.imageContainer} ${classes.centerAlign}`}
              onClick={onClickToAddNewPin}
              ref={imageParentRef}
            >
              <img
                src={imagePath}
                alt="could not be loaded.. plz try again!"
                className={`${classes.restrictDimensions} ${classes.displayBlock}`}
              />
              <svg className="overlay" width="100%" height="100%">
                {commentPins.map((pin) => (
                  selectedPointer === "Pin" ? 
                  <CommentPin
                    key={pin.key}
                    offsetLeft={pin.leftOffset}
                    offsetTop={pin.topOffset}
                    number={pin.number}
                    selected={pin.selected}
                    onSelect={makeSelected}
                    dragEnd={onDragEnd}
                  /> :
                  <CommentTextArea
                    key={pin.key}
                    number={pin.number}
                    offsetTop={pin.topOffset}
                    offsetLeft={pin.leftOffset}
                    dragEnd={onDragEnd}
                  />
                ))}
              </svg>
            </div>
          ) : null}
        </div>
        <div className={classes.magenta}>Note Panel</div>
      </div>
    </div>
  );
}
