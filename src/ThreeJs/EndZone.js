import React, { useRef } from 'react';
import * as THREE from 'three';
// import { useBox } from 'use-cannon'

const EndZone = (props) => {
  const zoneRef = useRef();
  // if (zoneRef.current) {
    // console.log('zoneRef', zoneRef.current.position)
    // props.updatePosition(zoneRef.current.position)
  // }
  return (
    <mesh ref={zoneRef} position={[0,0,-100]}>
      <boxBufferGeometry attach="geometry" args={[20,100,20]}/>
      <meshStandardMaterial wireframe={false} attach="material" color='yellow' transparent opacity={0.6} />
    </mesh>
  )
}

export default EndZone
