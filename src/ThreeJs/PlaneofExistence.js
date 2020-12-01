import React from 'react'
import * as THREE from 'three'
import { usePlane } from 'use-cannon'

const Plane = (props) => {
    const [ref] = usePlane(() => ({
      rotation: [-Math.PI /2,0,0]
    }))
    return (
      <mesh position={[0,0,0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeBufferGeometry attach="geometry" args={[100, 100, 100]} />
        <meshStandardMaterial attach="material" color="black" />
      </mesh>
    )
  
  }

export default Plane