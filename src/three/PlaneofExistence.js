import React from 'react';
import { usePlane } from '@react-three/cannon';
import { useLoader } from 'react-three-fiber';

const Plane = (props) => {
  const [planeRef] = usePlane(() => ({
    position: props.position,
    mass: 0,
    ...props,
  }));

  return (
    <mesh ref={planeRef} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[360, 360]} />
      <meshStandardMaterial attach="material" color="black" />
    </mesh>
  );
};

export default Plane;
