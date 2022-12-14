import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CommentPin from "./CommentPin.js";
import CommentTextArea from "./CommentTextArea.js";
import CommentLine from "./CommentLine.js";

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
  elBtns: {
    backgroundColor: "#359139",
    border: "none",
    color: "white",
    padding: "5px",
    textAlign: "center",
    textDecoration: "none",
    fontSize: "13px",
    margin: "4px 2px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  textAlignCenter: {
    textAlign: "center",
  },
  selected: {
    border: "2px solid black",
  },
}));

export default function Feedback(argument) {
  const classes = useStyles();
  const [imagePath, setImagePath] = useState(null);
  const [commentElements, setCommentElements] = useState([]);
  const [elementID, setElementID] = useState(0);
  const [number, setNumber] = useState(0);
  const [selectedPointer, setSelectedPointer] = useState("Textarea");
  const imageParentRef = useRef(null);
  const imageScrollOwnerRef = useRef(null);
  const onFileChange = (event) => {
    setCommentElements([]);
    setImagePath(URL.createObjectURL(event.target.files[0]));
  };
  const addNewElement = (event) => {
    if (commentElements.length > 0) {
      var result = commentElements.map((el) =>
        el.selected === true ? { ...el, selected: false } : el
      );
      setCommentElements(result);
    }
    // pin left offset = x-offset-of-click-from-viewport-left + image-horizontal-scroll-offset-from-left - left-offset-of-image-horizontal-scroll-from-its-start
    const newElementLeftOffset =
      event.clientX +
      imageScrollOwnerRef.current.scrollLeft -
      imageParentRef.current.offsetLeft;
    // pin top offset = y-offset-of-click-from-viewport-top + vertical-scroll-offset-of-image - top-offset-of-image-vertical-scroll-from-its-start
    const newElementTopOffset =
      event.clientY +
      imageScrollOwnerRef.current.scrollTop -
      imageParentRef.current.offsetTop;
    const newElement = {
      leftOffset: newElementLeftOffset,
      topOffset: newElementTopOffset,
      id: `el-${elementID.toString()}`,
      number: number + 1,
      selected: true,
      type: selectedPointer,
    };
    setCommentElements((oldArray) => [...oldArray, newElement]);
    // increment element key to be used for identifying next element uniquely for the rendering loop
    setElementID(elementID + 1)
    setNumber(selectedPointer === "Pin" ? number + 1 : number + 0);
  };

  const makeSelected = (pinNumber) => {
    const result = commentElements.map((el) =>
      el.number === pinNumber
        ? { ...el, selected: true }
        : { ...el, selected: false }
    );
    setCommentElements(result);
  };

  const onDragEnd = (elID, event, offsetFromElementLeft, offsetFromElementTop) => {
    // Element left offset = x-offset-of-click-from-viewport-left + image-horizontal-scroll-offset-from-left - left-offset-of-image-horizontal-scroll-from-its-start
    const updatedLeftOffset =
      event.clientX +
      imageScrollOwnerRef.current.scrollLeft -
      imageParentRef.current.offsetLeft - offsetFromElementLeft;
    // Element top offset = y-offset-of-click-from-viewport-top + vertical-scroll-offset-of-image - top-offset-of-image-vertical-scroll-from-its-start
    const updatedTopOffset =
      event.clientY +
      imageScrollOwnerRef.current.scrollTop -
      imageParentRef.current.offsetTop - offsetFromElementTop;


    const result = commentElements.map((el) =>
      el.id === elID
        ? { ...el, leftOffset: updatedLeftOffset, topOffset: updatedTopOffset }
        : { ...el }
    );
    setCommentElements(result);
  };

  let line = {}
  const handleEvent = (event) => {
    if (event.type === 'mousedown') {
      line = {
        startX: event.clientX + imageScrollOwnerRef.current.scrollLeft -
          imageParentRef.current.offsetLeft,
        startY: event.clientY +
        imageScrollOwnerRef.current.scrollTop -
        imageParentRef.current.offsetTop
      }
    }
    if (event.type === 'mouseup') {
      line = {...line, 
        endX: event.clientX + imageScrollOwnerRef.current.scrollLeft -
          imageParentRef.current.offsetLeft,
        endY: event.clientY +
        imageScrollOwnerRef.current.scrollTop -
        imageParentRef.current.offsetTop
      }
      const newElement = {
        initialLeftOffset: line.startX,
        initialTopOffset: line.startY,
        finalLeftOffset: line.endX,
        finalTopOffset: line.endY,
        id: `el-${elementID.toString()}`,
        type: selectedPointer,
      };
      setCommentElements((oldArray) => [...oldArray, newElement]);
      // increment element key to be used for identifying next element uniquely for the rendering loop
      setElementID(elementID + 1)
    }
  }

  return (
    <div className={classes.draftWrapper}>
      <div className={classes.feedbackContainerHeader}>
        <input type="file" onChange={onFileChange} />
      </div>
      <div className={classes.draftBody}>
        <div className={classes.magenta}>
          <div className={classes.textAlignCenter}>
            <button
              className={`${classes.elBtns}  ${selectedPointer === "Pin" ? classes.selected : ''}`}
              onClick={() => setSelectedPointer("Pin")}
            >
              Pin
            </button>
            <button
              className={`${classes.elBtns}  ${selectedPointer === "Textarea" ? classes.selected : ''}`}
              onClick={() => setSelectedPointer("Textarea")}
            >
              Text
            </button>
            <button
              className={`${classes.elBtns}  ${selectedPointer === "Line" ? classes.selected : ''}`}
              onClick={() => setSelectedPointer("Line")}
            >
              Line
            </button>
          </div>
        </div>
        <div
          className={`${classes.cyan} ${classes.displayFlex} ${classes.scrollAuto}`}
          ref={imageScrollOwnerRef}
        >
          {imagePath ? (
            <div
              className={`${classes.imageContainer} ${classes.centerAlign}`}
              onClick={e => selectedPointer !== "Line" ? addNewElement(e) : e.preventDefault()}
              onMouseDown={e => selectedPointer === "Line" ? handleEvent(e) : e.preventDefault()}
              onMouseUp={e => selectedPointer === "Line" ? handleEvent(e) : e.preventDefault()}
              ref={imageParentRef}
            >
              <img
                src={imagePath}
                alt="could not be loaded.. plz try again!"
                className={`${classes.restrictDimensions} ${classes.displayBlock}`}
              />
              <svg className="overlay" width="100%" height="100%">
                {commentElements.map((el) =>
                  el.type === "Pin" ? (
                    <CommentPin
                      key={el.id}
                      id={el.id}
                      offsetLeft={el.leftOffset}
                      offsetTop={el.topOffset}
                      number={el.number}
                      selected={el.selected}
                      onSelect={makeSelected}
                    />
                  ) : el.type === "Textarea" ? (
                    <CommentTextArea
                      key={el.id}
                      id={el.id}
                      number={el.number}
                      offsetTop={el.topOffset}
                      offsetLeft={el.leftOffset}
                      dragEnd={onDragEnd}
                      imgParentRef={imageParentRef}
                      imgScrollRef={imageScrollOwnerRef}
                    />
                  ) : <CommentLine
                    key={el.id}
                    id={el.id}
                    initialLeftOffset={el.initialLeftOffset}
                    initialTopOffset={el.initialTopOffset}
                    finalLeftOffset={el.finalLeftOffset}
                    finalTopOffset={el.finalTopOffset}
                  />
                )}
              </svg>
            </div>
          ) : null}
        </div>
        <div className={classes.magenta}>Note Panel</div>
      </div>
    </div>
  );
}
