import React, { useRef } from 'react';
import * as THREE from 'three';
import { useBox } from 'use-cannon'



const BlockK = (props) => {


  // const blockRef = useRef()
  const [blockRef, api] = useBox(() => ({mass:1, args:[5,5,5], ...props}))
  console.log(blockRef, api)
    return (
      <mesh ref={blockRef}>
        <boxBufferGeometry attach="geometry" args={[5,5,5]} />
        <meshStandardMaterial wireframe={false} attach="material" transparent opacity={1} />
      </mesh>
    )
  }

export default BlockK
