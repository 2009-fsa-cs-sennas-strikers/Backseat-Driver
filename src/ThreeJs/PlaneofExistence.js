import React from 'react'
import { usePlane } from '@react-three/cannon'


const Plane = (props) => {
    const [planeRef] = usePlane(() => ({
      rotation: props.rotation,
      position: props.position,
      mass: 0,
      ...props
    }))

    return (
      <mesh ref={planeRef}>
        <planeBufferGeometry attach="geometry" args={[300, 300]} />
        <meshStandardMaterial attach="material" color="black" />
      </mesh>
    )

  }

export default Plane
