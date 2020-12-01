import React, { Suspense, useState, useRef } from 'react'
import * as THREE from 'three'
import { Canvas } from 'react-three-fiber'
import {OrbitControls, Stars} from 'drei'
import {Physics} from 'use-cannon'
import Car from './ThreeJs/Car'
import Box from './ThreeJs/Box'
import Plane from './ThreeJs/PlaneofExistence'



function App() {  
  const [position, setPosition] = useState({x:1, y:0, z:0})
  const {x,y,z} = position
  return (
    <>
     <div className="controls">
        
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
