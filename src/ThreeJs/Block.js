import React, { useRef } from 'react';
import * as THREE from 'three';
import { useBox } from '@react-three/cannon';
import { useLoader } from 'react-three-fiber';
import Building from './Building';
import Sidewalk from './Sidewalk';
// import glass from '../textures/glass-building.png'
// import flat from '../textures/light-concrete.jpg'

// Made the block 30 length x 30 width x 10 height
// Allocated 20length "streets between each block"

const Block = (props) => {
  // const blockRef = useRef()
  // const glassTex = useLoader(THREE.TextureLoader, glass)
  // const flatTex = useLoader(THREE.TextureLoader, flat)

  return (
    <>
      <Building
        position={[props.position[0], props.size[1] / 2, props.position[2]]}
        args={[props.size[0] - 5, props.size[1], props.size[2] - 5]}
      />
      <Sidewalk position={props.position} size={props.size} />
    </>
  );
};

export default Block;
