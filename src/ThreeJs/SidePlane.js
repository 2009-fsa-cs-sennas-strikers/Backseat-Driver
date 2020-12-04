import React from 'react'
import { applyProps } from 'react-pixi-fiber'
import * as THREE from 'three'
import { usePlane } from 'use-cannon'

const SidePlane = (props) => {
    const [planeRef] = usePlane(() => ({
      rotation: props.rotation,
      position: props.position,
      type: 'Kinematic',
      ...props
    }))
    // position={[0,0,0]} rotation={[-Math.PI / 2, 0, 0]
    console.log('plane position', planeRef)
    return (
      <mesh ref={planeRef}>
        <planeBufferGeometry attach="geometry" args={[0, 0]} />
        <meshStandardMaterial attach="material" />
      </mesh>
    )

  }

export default SidePlane
