import React, { useRef } from 'react';
import * as THREE from 'three';
import { useBox } from '@react-three/cannon';
import { useLoader } from 'react-three-fiber';
// import glass from '../textures/glass-building.png'
// import flat from '../textures/light-concrete.jpg'

// Made the block 30 length x 30 width x 10 height
// Allocated 20length "streets between each block"

const Block = (props) => {
  // const blockRef = useRef()
  // const glassTex = useLoader(THREE.TextureLoader, glass)
  // const flatTex = useLoader(THREE.TextureLoader, flat)
  const [blockRef, api] = useBox(() => ({
    type: 'Kinematic',
    args: [30, 10, 30],
    ...props,
  }));
  return (
    <mesh ref={blockRef} receiveShadow castShadow>
      <boxBufferGeometry attach="geometry" args={[30, 10, 30]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        metalness={0.2}
        roughness={3}
      />
      {/* */}
      {/* <meshStandardMaterial attachArray="material" map={glassTex} transparent opacity={1} metalness={0.2} roughness={3}/>
        <meshStandardMaterial attachArray="material" map={flatTex} transparent opacity={1} />roof texture
        <meshStandardMaterial attachArray="material" map={glassTex} transparent opacity={1} metalness={0.2} roughness={3} />
        <meshStandardMaterial attachArray="material" map={glassTex} transparent opacity={1} metalness={0.2} roughness={3} />
        <meshStandardMaterial attachArray="material" map={glassTex} transparent opacity={1} metalness={0.2} roughness={3} /> */}
    </mesh>
  );
};

export default Block;
