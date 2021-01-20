import React from 'react';
import { useBox } from '@react-three/cannon';

const Sidewalk = (props) => {
  const [planeRef] = useBox(() => ({
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
