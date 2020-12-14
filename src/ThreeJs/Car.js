import React, { useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame, useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useBox, usePointToPointConstraint } from '@react-three/cannon'
import car from '../models/models/McLaren.glb'
import { PerspectiveCamera, PointerLockControls } from '@react-three/drei'
import Viewport from './Viewport'
import Block from './BlockK'
import { connect } from 'react-redux'

let rotation = -90
let acc = 0
let baseVel = 0

const Car = (props) => {
  //carRef: car's property in scene (read only)
  //api: car's physics object (methods to set/subscribe)
  const gltf = useLoader(GLTFLoader, car);
  const [carRef, api] = useBox(() => ({
    mass: 1,
    args: [4.7, 1.3, 2],
    position: props.carPosition,
  }));
  // const [randoRef, bApi] = useBox(() => ({mass:1, args:[4.7, 1.3, 2]}))

  let carPosition;
  if (carRef.current) {
    carPosition = carRef.current.position;
  }
  const endZonePosition = props.position

  useFrame(() => {
  console.log(baseVel, acc)
      if (carPosition.x >=  endZonePosition.x - 10 && carPosition.x <= endZonePosition.x + 10 && carPosition.z  >=  endZonePosition.z - 10 && carPosition.z <= endZonePosition.z + 10) {

      props.stopListening()
      props.changeWin()
      props.changePlaying()
    }

    api.rotation.set(0, (Math.PI * rotation/180), 0)
  switch (props.action){
    case 'right':
        rotation--
        if ( (rotation % 90) === 0){
          props.setAction('')
          }
      break;
    case 'left':
        rotation++
        if ( (rotation % 90) === 0){
        props.setAction('')
        }
      break;
    case 'up':
      if (acc < 5 && baseVel > 0){
      acc++
      }
      props.setAction('')
      break;
    case 'down':
      if (acc > 0){
      acc--
      }
      props.setAction('')
      break;
    case 'go':
      baseVel = 10
      if (acc === 0){
        acc++
      }
      props.setAction('')
      break;
    case 'stop':
      baseVel = 0
      acc = 0
      props.setAction('')
    break;
    default:
     break;
  }

    if (rotation === 360 || rotation === -360){
      rotation = 0
    }

  switch(Math.round(rotation/90)){
    case 0:
      api.velocity.set(-(baseVel*acc),-1,0)
    break;
    case 1:
      api.velocity.set(0,-1,(baseVel*acc))
    break;
    case 2:
      api.velocity.set((baseVel*acc),-1,0)
      break;
    case 3:
      api.velocity.set(0,-1,-(baseVel*acc))
      break;
    case -3:
        api.velocity.set(0,-1,(baseVel*acc))
      break;
    case -2:
        api.velocity.set((baseVel*acc),-1,0)
        break;
    case -1:
        api.velocity.set(0,-1,-(baseVel*acc))
        break;
    default:
    break;
  }


  });
  return (
    <>
      {/* <mesh ref={randoRef}>
    <boxBufferGeometry attach="geometry" args={[0.25, 0.25, 0.25]} position={4,0,0} />
    </mesh> */}
      <mesh ref={carRef}>
        <PerspectiveCamera
          position={[0.7, 0.35, 0]}
          rotation={[0, (Math.PI * 90) / 180, 0]}
          makeDefault={true}
        />
        {/* <boxBufferGeometry attach="geometry" args={[4.7, 1.3, 2]} /> */}
        <primitive
          object={gltf.scene}
          scale={[10, 10, 10]}
          position={[1.8, 0, -1.825]}
          rotation={[0, (Math.PI * -45) / 180, 0]}
        />
        <meshStandardMaterial wireframe={true} attach="material" />
        <PointerLockControls />
      </mesh>
      <Viewport carPosition={carPosition} />
    </>
  );
};

const mapState = (state) => ({
  position: state.position
})

export default connect(mapState, null)(Car);
