import React from 'react'
import { applyProps } from 'react-pixi-fiber'
import * as THREE from 'three'
import { usePlane } from 'use-cannon'

const Plane = (props) => {
    const [planeRef] = usePlane(() => ({
      rotation: props.rotation,
      position: props.position,
      mass: 0,
      ...props
    }))
    // position={[0,0,0]} rotation={[-Math.PI / 2, 0, 0]
    console.log('plane position', planeRef)
    return (
      <mesh ref={planeRef}>
        <planeBufferGeometry attach="geometry" args={[100, 100]} />
        <meshStandardMaterial attach="material" color="black" />
      </mesh>
    )

  }

export default Plane
