import React from 'react';
import { useBox } from '@react-three/cannon';

const TestBlock = (props) => {
  const [blockRef, api] = useBox(() => ({
    mass: 10,
    position: props.position,
    ...props,
  }));
  return (
    <mesh scale={[1, 1, 1]} ref={blockRef}>
      <boxBufferGeometry attach="geometry" args={[20, 10, 20]} />
      <meshStandardMaterial
        wireframe={false}
        attach="material"
        transparent
        opacity={1}
      />
    </mesh>
  );
};

export default TestBlock;
