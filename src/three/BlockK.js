import React from 'react';
import { useBox } from '@react-three/cannon';

const BlockK = (props) => {
  const [blockRef, api] = useBox(() => ({
    mass: 1,
    args: [5, 5, 5],
    ...props,
  }));
  return (
    <mesh ref={blockRef}>
      <boxBufferGeometry attach="geometry" args={[5, 5, 5]} />
      <meshStandardMaterial
        wireframe={false}
        attach="material"
        transparent
        opacity={1}
      />
    </mesh>
  );
};

export default BlockK;
