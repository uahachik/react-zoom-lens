import React, { useState } from 'react';
import PropTypes from 'prop-types';

const initialState = (initX, initY) => {
  const initObject = {x: initX - 2, y: initY};

  if (window.innerWidth > 762) {
    return {...initObject, y: initY - 0};
  }

  return initObject;
}

const Cursor = ({ cursorProps: {commutator: {x, y}, renderLens} }) => {
  const [cursor, trackCursor] = useState(initialState(x, y));

  const trackLens = e => {
    trackCursor({
      x: e.clientX - 65,
      y: e.clientY - 62,
    });
  }

  return (
    <div style={{ height: '100%' }} onMouseMove={trackLens} onTouchMove={trackLens}>

        {/*The current Lens position is ({cursor.x}, {cursor.y})*/}

        {/* 
            https://reactjs.org/docs/render-props.html
            Instead of providing a static representation
            of what <Cursor> renders, use the `render (renderLens)`
            prop patern to dynamically determine what to render. (FB) 
                                                                       */}

        {renderLens(cursor)}
    </div>
  );
}

Cursor.defaultProps = {
  x: 0,
  y: 0,
  renderLens: () => {},
}

Cursor.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  cursorPosition: PropTypes.func,
}

export default Cursor;