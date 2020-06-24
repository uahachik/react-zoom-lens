import React, { useState, useLayoutEffect, useRef } from 'react';
import './App.css';
import Lens from './components/Lens';
import Cursor from './components/Cursor';
// import img from './assets/bird-1045954_640.jpg';
import img from './assets/tree-5255288__340.jpg';
// import img from './assets/mountains-1412683_640.png';

const App = () => {
  const [isLens, switchLens] = useState(false);
  const [image, setImage] = useState(null);
  const imageRef = React.useRef();

  // get button position to define the lens start position
  const [commutator, setCommutator] = useState({});
  const buttonRef = useRef();

  useLayoutEffect(() => {
    setCommutator({
      x: buttonRef.current.getBoundingClientRect().x,
      y: buttonRef.current.getBoundingClientRect().y,
    });
  }, []);
    
  // Use Render Props for Cross-Cutting Concerns
  // render Lens component function to Cursor
  const renderLens = lensPosition => (
    <Lens lensPosition={lensPosition} lens={{switchLens, image}}/>
  );

  return (
    <div className="App">
      {isLens
        ? <h6 style={{textAlign: 'center'}}>
            Scroll mouse to zoom image or<br />
            Click It to turn off Lens
          </h6>
        : <h6>Picture Zooming App</h6>
      }

      <button
        ref={buttonRef}
        style={isLens ? {opacity: '.57'} : null}
        onClick={() => switchLens(true)}
      >
        <span
          style={
            isLens ? {opacity: '.15', textShadow: 'none'} : null
          }
        >
          Turn on Lens
        </span>
      </button>


      {isLens &&
        <Cursor cursorProps={{commutator, renderLens}}/>
      }

      <img
        ref={imageRef}
        src={img} alt="an object for zooming"
        onLoad={() => setImage(imageRef.current)}
      />
    </div>
  );
};

export default App;
