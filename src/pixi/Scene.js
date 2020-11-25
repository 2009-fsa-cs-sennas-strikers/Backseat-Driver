import React from 'react';
import { Stage } from 'react-pixi-fiber';
import RotatingBunny from './Game';

const options = {
  backgroundColor: 0x1099bb,
  height: 600,
  width: 800,
  antialias: true, // default: false
  transparent: false, // default: false
  resolution: 1, // default: 1
};

const Scene = (props) => {
  return (
    <Stage options={options}>
      <RotatingBunny />
    </Stage>
  );
};

// app.renderer.view.style.position = "absolute";
// app.renderer.view.style.display = "block";
// app.renderer.autoResize = true;
// app.renderer.resize(window.innerWidth, window.innerHeight);

export default Scene;
