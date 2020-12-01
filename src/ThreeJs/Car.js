import React from 'react'
import * as THREE from 'three'
import { useFrame, useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useBox } from 'use-cannon'
import car from '../models/models/McLaren.glb'


const Car = ({x,y,z}) => {
    const [carRef, api] = useBox(() => ({mass:1, position: [0,0.075,0]}))
    const gltf = useLoader(GLTFLoader, car)
    const vec = new THREE.Vector3(x,y,z)
  useFrame(() => carRef.current.position.lerp(vec, 0.1));
    return <primitive ref={carRef} object={gltf.scene} scale={[10,10,10]} position={[0, 0, 0]} />
  }


export default Car