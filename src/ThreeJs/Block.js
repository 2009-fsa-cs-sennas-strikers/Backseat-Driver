import React, { useRef } from 'react';
import * as THREE from 'three';
import { useBox } from '@react-three/cannon'

// Made the block 30 length x 30 width x 10 height
// Allocated 20length "streets between each block"

const Block = (props) => {
  // const blockRef = useRef()
  const [blockRef, api] = useBox(() => ({type: 'Static', args:[30,10,30], ...props}))
    return (
      <mesh ref={blockRef}>
        <boxBufferGeometry attach="geometry" args={[30,10,30]} />
        <meshStandardMaterial wireframe={false} attach="material" transparent opacity={1} />
      </mesh>
    )
  }

export default Block
