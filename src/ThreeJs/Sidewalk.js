import React from 'react';
import { useBox } from '@react-three/cannon';
import { useLoader } from 'react-three-fiber';
import * as THREE from 'three';
import sidewalk from '../textures/sidewalk.jpg';

const Sidewalk = (props) => {
  //receives position from props
  // const sideTex = useLoader(THREE.TextureLoader, sidewalk)
  const [planeRef] = useBox(() => ({
    // position: props.position,
    type: 'Kinematic',
    args: [props.size[0], 0.1, props.size[2]],
    ...props,
  }));

  return (
    <mesh ref={planeRef} receiveShadow castShadow>
      <boxBufferGeometry
        attach="geometry"
        args={[props.size[0], 0.2, props.size[2]]}
      />
      <meshStandardMaterial attach="material" color="gray" />
    </mesh>
  );
};

export default Sidewalk;
