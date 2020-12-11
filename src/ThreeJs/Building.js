import React, { useRef } from 'react';
import * as THREE from 'three';
import { useBox } from '@react-three/cannon';
import { useLoader } from 'react-three-fiber';
import glass from '../textures/glass-building.png';
import flat from '../textures/light-concrete.jpg';

// Made the block 30 length x 30 width x 10 height
// Allocated 20length "streets between each block"

const Building = (props) => {
  // const blockRef = useRef()
  // const glassTex = useLoader(THREE.TextureLoader, glass)
  // const flatTex = useLoader(THREE.TextureLoader, flat)
  const [buildingRef, api] = useBox(() => ({
    type: 'Kinematic',
    args: props.args,
    ...props,
  }));

  return (
    <mesh ref={buildingRef} receiveShadow castShadow>
      <boxBufferGeometry attach="geometry" args={props.args} />
      <meshStandardMaterial attach="material" transparent opacity={0.5} />
    </mesh>
  );
};

export default Building;
