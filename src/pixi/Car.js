import React from 'react';
import { Sprite } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';

//replace image with car?
const car = 'mclaren.png';
const centerAnchor = new PIXI.Point(0.5, 0.5);

function Car(props) {
  return (
    <Sprite
      anchor={centerAnchor}
      scale={(0.1, 0.1)}
      texture={PIXI.Texture.from(car)}
      {...props}
    />
  );
}

export default Car;
