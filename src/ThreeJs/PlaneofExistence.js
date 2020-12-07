import React from 'react'
import { usePlane } from 'use-cannon'

const Plane = ({rotation}) => {
   const [planeRef] = usePlane(() => ({
     rotation: rotation,
     position: [0,0,0],
     mass: 0
   }))
    return (
      <mesh ref={planeRef}>
        <planeBufferGeometry attach="geometry" args={[100, 100]} />
        <meshStandardMaterial attach="material" color="black" />
      </mesh>
    )

  }

export default Plane
