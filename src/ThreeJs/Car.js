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

const Car = (props) => {
  // position from state (unused)
  console.log(props)
  //carRef: car's property in scene (read only)
  //api: car's physics object (methods to set/subscribe)
    const [carRef, api] = useBox(() => ({mass:1, args:[4.7, 1.3, 2], position: props.carPosition}))
    const [randoRef, bApi] = useBox(() => ({mass:1, args:[4.7, 1.3, 2]}))
    const gltf = useLoader(GLTFLoader, car)

  let carPosition;
  if (carRef.current) {
    carPosition = carRef.current.position;
  }
  const endZonePosition = props.position
  useFrame(() => {
      if (carPosition.x >=  endZonePosition.x - 10 && carPosition.x <= endZonePosition.x + 10 && carPosition.z  >=  endZonePosition.z - 10 && carPosition.z <= endZonePosition.z + 10) {

      props.stopListening()
      props.changeWin()
      props.changePlaying()
    }
    api.velocity.set(0,-5,0)
    if (props.action === 'right') {
      api.velocity.set(15,-1,0);
      api.rotation.set(0, (Math.PI * 180/180), 0)
    }
    if (props.action === 'left') {
      api.velocity.set(-15,-1,0);
      api.rotation.set(0, (Math.PI * 0/180), 0)
    }
    if (props.action === 'up') {
      api.velocity.set(0,-1,-45);
      api.rotation.set(0, (Math.PI * -90/180), 0)
    }
    if (props.action === 'down') {
      api.velocity.set(0,-1,15);
      api.rotation.set(0, (Math.PI * 90/180), 0)
    }
  });
  return (
    <>
    <mesh ref={randoRef}>
    <boxBufferGeometry attach="geometry" args={[0.25, 0.25, 0.25]} position={4,0,0} />
    </mesh>
      <mesh ref={carRef}>
        <PerspectiveCamera
          position={[0.7, 0.35, 0]}
          rotation={[0, (Math.PI * 90) / 180, 0]}
          makeDefault={true}
        />
        <boxBufferGeometry attach="geometry" args={[4.7, 1.3, 2]} />
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
