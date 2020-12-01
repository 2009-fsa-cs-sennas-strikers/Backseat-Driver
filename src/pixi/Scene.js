import React from 'react';
// import * as PIXI from 'pixi.js';
import { Stage } from 'react-pixi-fiber';
import Game from './Game';

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
      <Game />
    </Stage>
  );
};

export default Scene;
