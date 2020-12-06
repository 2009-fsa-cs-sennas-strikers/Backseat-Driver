import React from 'react'
import { usePlane } from 'use-cannon'

const Plane = (props) => {
    const [planeRef] = usePlane(() => ({
      rotation: props.rotation,
      position: props.position,
      mass: 0,
      ...props
    }))
    
    return (
      <mesh ref={planeRef}>
        <planeBufferGeometry attach="geometry" args={[100, 100]} />
        <meshStandardMaterial attach="material" color="black" />
      </mesh>
    )

  }

export default Plane
