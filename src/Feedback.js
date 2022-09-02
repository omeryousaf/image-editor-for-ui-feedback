import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CommentPin from './CommentPin.js';

const useStyles = makeStyles(theme => ({
	draftWrapper: {
  	width: "90vw",
  	'--heightUnderTopNav': "calc(100vh - 64px)",
  	height: "calc(var(--heightUnderTopNav) * 0.9)",
  	background: "green",
  	'--unusedHeightBelowTopNav': "calc(var(--heightUnderTopNav) * 0.1)",
  	'margin-top': "calc(var(--unusedHeightBelowTopNav) / 2)",
  	'margin-left': "calc(10vw / 2)",
  	display: "flex",
    'flex-direction': "column",
    '--containerHeaderHeight': "20px"
	},
  feedbackContainerHeader: {
    height: "var(--containerHeaderHeight)"
  },
  draftBody: {
    display: "grid",
    'grid-template-columns': "5fr 1fr",
    width: "100%",
    height: "calc(100% - var(--containerHeaderHeight))"
  },
  flexContainer: {
  	display: "flex"
  },
  cyan: {
  	background: "cyan"
  },
  magenta: {
  	background: "magenta"
  },
  restrictDimensions: {
    'max-height': "2000px",
    'max-width': "2000px"
  },
  displayFlex: {
    display: "flex"
  },
  scrollAuto: {
    overflow: "auto"
  },
  centerAlign: {
    margin: "auto"
  },
  imageContainer: {
    position: "relative",
    '& .overlay': {
      position: "absolute",
      top: "0",
      left: "0"
    }
  },
  displayBlock: {
    display: "block"
  }
}));

export default function Feedback(argument) {
	const classes = useStyles();
  const [imagePath, setImagePath] = useState(null);
  const [commentPins, setCommentPins] = useState([]);
  const [pinUniqueKey, setPinUniqueKey] = useState(0);
  const imageParentRef = useRef(null);
  const imageScrollOwnerRef = useRef(null);

  const onFileChange = event => {
    setCommentPins([]);
    setImagePath(URL.createObjectURL(event.target.files[0]));
  };

  const onClickToAddNewPin = event => {
    // pin left offset = x-offset-of-click-from-viewport-left + image-horizontal-scroll-offset-from-left - left-offset-of-image-horizontal-scroll-from-its-start
    const pinLeftOffset = event.clientX + imageScrollOwnerRef.current.scrollLeft - imageParentRef.current.offsetLeft;
    // pin top offset = x-offset-of-click-from-viewport-top + vertical-scroll-offset-of-image - top-offset-of-image-vertical-scroll-from-its-start
    const pinTopOffset = event.clientY + imageScrollOwnerRef.current.scrollTop - imageParentRef.current.offsetTop;
    setCommentPins(oldArray => [...oldArray,
      <CommentPin
        key={`pin-${pinUniqueKey.toString()}`}
        offsetLeft={pinLeftOffset}
        offsetTop={pinTopOffset}
        number={pinUniqueKey + 1} />
    ]);
    // increment pin key to be used for identifying next pin uniquely for the rendering loop
    setPinUniqueKey(pinUniqueKey + 1);
  };

  return (
    <div
      className={classes.draftWrapper}>
    	<div
        className={classes.feedbackContainerHeader}>
        <input
          type="file"
          onChange={onFileChange}/>
    	</div>
  		<div
        className={classes.draftBody}>
  			<div
          className={`${classes.cyan} ${classes.displayFlex} ${classes.scrollAuto}`}
          ref={imageScrollOwnerRef}>
          { imagePath ?
            <div
              className={`${classes.imageContainer} ${classes.centerAlign}`}
              onClick={onClickToAddNewPin}
              ref={imageParentRef}>
              <img
                src={imagePath}
                alt="could not be loaded.. plz try again!"
                className={`${classes.restrictDimensions} ${classes.displayBlock}`}/>
              <svg
                className="overlay" width="100%" height="100%">
                {commentPins}
              </svg>
            </div> : null
          }
        </div>
  			<div
          className={classes.magenta}>
          Note Panel
        </div>
			</div>
    </div>
  );
}