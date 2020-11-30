import React, { Suspense, useState, useRef } from 'react'
import { Canvas, useFrame, useLoader } from 'react-three-fiber'
import {OrbitControls, Stars} from 'drei'
import {Physics, usePlane, useBox} from 'use-cannon'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import car from './models/models/McLaren.glb'

function Car(props) {
  const [ref, api] = useBox(() => ({ mass:1, position: [0,0.075,0]}))
  const gltf = useLoader(GLTFLoader, car)
  return <primitive onClick={() => {
    api.position.set(1,0,0)
  }} ref={ref} object={gltf.scene} scale={[10,10,10]} position={[0, 0, 0]} />
}

function Box() {
  return (
    <mesh>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" transparent opacity={0.5} />
    </mesh>
  )
}

function Plane(props){
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


function App() {  
  return (
    <>
      <Canvas>
        <OrbitControls />
        <Stars />
        <ambientLight intensity={0.5} />
        <spotLight intensity={0.8} position={[300, 300, 400]} />
        <Physics >
        <Suspense fallback={<Box />}>{<Car />}</Suspense>
        <Plane />
        </Physics >
      </Canvas>
    </>
  )
}

export default App
