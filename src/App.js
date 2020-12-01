import React, { Suspense, useState, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useLoader } from 'react-three-fiber'
import {OrbitControls, Stars} from 'drei'
import {Physics, usePlane, useBox} from 'use-cannon'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import car from './models/models/McLaren.glb'

const Car = ({x,y,z}) => {
  const carRef = useRef()
  const gltf = useLoader(GLTFLoader, car)
  const vec = new THREE.Vector3(x,y,z)
useFrame(() => carRef.current.position.lerp(vec, 0.1));
  return <primitive ref={carRef} object={gltf.scene} scale={[10,10,10]} position={[0, 0, 0]} />
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
  const [position, setPosition] = useState({x:1, y:0, z:0})
  const {x,y,z} = position
  return (
    <>
     <div className="controls">
        <label>x</label>
        <input
          onChange={(e) => setPosition({ ...position, x: e.target.value })}
          value={position.x}
          type="number"
        />
        <label>y</label>
        <input
          onChange={(e) => setPosition({ ...position, y: e.target.value })}
          value={position.y}
          type="number"
        />
        <label>z</label>
        <input
          onChange={(e) => setPosition({ ...position, z: e.target.value })}
          value={position.z}
          type="number"
        />
      </div>
      <Canvas>
        <OrbitControls />
        <Stars />
        <ambientLight intensity={0.5} />
        <spotLight intensity={0.8} position={[300, 300, 400]} />
        <Physics >
        <Suspense fallback={<Box />}>{<Car x={x} y={y} z={z} />}</Suspense>
        <Plane />
        </Physics >
      </Canvas>
    </>
  )
}

export default App
