import React from 'react';
import { useBox } from '@react-three/cannon';

const Building = (props) => {
  const [buildingRef, api] = useBox(() => ({
    type: 'Kinematic',
    args: props.args,
    ...props,
  }));

  return (
    <group ref={buildingRef} receiveShadow castShadow>
      <mesh receiveShadow castShadow>
        <boxBufferGeometry attach="geometry" args={props.args} />
        <meshStandardMaterial
          attach="material"
          color={props.color}
          roughness={0.5}
          metalNess={0.5}
        />
      </mesh>
      {props.color !== 'green' && (
        <mesh>
          <boxBufferGeometry attach="geometry" args={props.args} />
          <meshBasicMaterial attach="material" wireframe color="gray" />
        </mesh>
      )}
    </group>
  );
};

export default Building;
