import React from 'react'
import { usePlane } from 'use-cannon'

const SidePlane = (props) => {
    const [planeRef] = usePlane(() => ({
      rotation: props.rotation,
      position: props.position,
      mass:0,
      ...props
    }))

    return (
      <mesh ref={planeRef}>
        <planeBufferGeometry attach="geometry" args={[0, 0]} />
        <meshStandardMaterial attach="material" />
      </mesh>
    )

  }

export default SidePlane
