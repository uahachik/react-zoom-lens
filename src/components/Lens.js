import React, { useState, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';

let initialValue = 0;
let prevScroll = 530;

const Lens = ({ lensPosition, lens: { switchLens, image } }) => {
  const [lensWidth, setLensWidth] = useState();
  const [lensHeight, setLensHeight] = useState();
  let [ratio, setRatio] = useState(1.38);
  const lensRef = useRef(initialValue);
  // console.log(ratio)

  // initial lens scroll value to the bottom 
  useLayoutEffect(() => {
    if (lensRef.current && lensRef.current.scrollTop === 0) {
      initialValue = lensRef.current.scrollTo(0, 530);
    }
  }, [])

  // lens width and height
  useLayoutEffect(() => {
    const {current: lens} = lensRef;
    setLensWidth(window.getComputedStyle(lens).width.slice(0, -2));
    setLensHeight(window.getComputedStyle(lens).height.slice(0, -2));
  }, [])

  // background attributes 
  const backgroundImage = `url( ${image.src} )`;
  const backgroundSize = (image.offsetWidth * ratio) + "px " 
                            + (image.offsetHeight * ratio) + "px";

  // vertical properties of the image
  const imageWidth = image.naturalWidth;
  const offsetLeft = image.offsetLeft;
  
  // left and right frame to the image
  if (lensPosition.x - 2 < offsetLeft) {
    lensPosition.x = offsetLeft;
  } else if (lensPosition.x > offsetLeft + imageWidth - lensWidth) {
    lensPosition.x = offsetLeft + imageWidth - lensWidth - 3;
  }
  
  // other vertical properties of the background
  const backgroundDiffX = imageWidth * ratio - imageWidth;
  const backgroundImageWidth = imageWidth - lensWidth;
  const relativeOffsetX = backgroundDiffX / backgroundImageWidth;
  const correctionX = (lensPosition.x - offsetLeft) * relativeOffsetX;
  const currentLensPositionX =
          "-" + (lensPosition.x - offsetLeft + correctionX + 1) + "px";

  // horizontal properties of the image
  const imageHeight = image.naturalHeight;
  const offsetTop = image.offsetTop;

  // up and bottom frame to the image
  if (lensPosition.y - 2 < offsetTop) {
    lensPosition.y = offsetTop;
  } else if (lensPosition.y > offsetTop + imageHeight - lensHeight) {
    lensPosition.y = offsetTop + imageHeight - lensHeight - 3;
  }
  
  // other horizontal properties of the background
  const backgroundDiffY = imageHeight * ratio - imageHeight;
  const backgroundImageHeight = imageHeight - lensHeight;
  const relativeOffsetY = backgroundDiffY / backgroundImageHeight;
  const correctionY = (lensPosition.y - offsetTop) * relativeOffsetY;
  const currentLensPositionY =
          " -" + (lensPosition.y - offsetTop + correctionY) + "px";

  const backgroundPosition = currentLensPositionX + currentLensPositionY;

  const lensOnStyle = {
    left: lensPosition.x,
    top: lensPosition.y,
    backgroundSize,
    backgroundImage,
    backgroundPosition,
  };

  // handle ratio
  const onScrollHandle = () => {
    // console.log(prevScroll)
    // console.log(lensRef.current.scrollTop)
    // console.log(ratio)
    // let value = 1;
    const currScroll = lensRef.current.scrollTop;
  
    if (currScroll < prevScroll) {
      prevScroll = currScroll;
      // console.log('increase')
      ratio += 0.02;
      setRatio(ratio);
    } else if (currScroll > prevScroll && ratio > 1.4) {
      prevScroll = currScroll;
      // console.log('decrease')
      ratio -= 0.02;
      setRatio(ratio);
    }
  }

  return (
    <>
      {image &&
        <div
          ref={lensRef}
          className="Lens"
          style={lensOnStyle}
          onClick={() => switchLens(false)}
          onScroll={onScrollHandle}
        >
          <div style={{height: 555}} />
        </div>
      }
    </>
  );
};

Lens.defaultProps = {
  switchLens: () => {},
  image: {},
  ratio: 0,
};

Lens.propTypes = {
  lensPosition: PropTypes.object.isRequired,
  switchLens: PropTypes.func,
  image: PropTypes.object,
  ratio: PropTypes.number,
};

export default Lens;