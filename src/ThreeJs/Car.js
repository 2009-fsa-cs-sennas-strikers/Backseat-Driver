import React, { useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame, useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useBox } from 'use-cannon'
import car from '../models/models/McLaren.glb'
import lerp from 'lerp'
import {PerspectiveCamera, OrbitControls, draco} from 'drei'

function keyboard(value) {
  let key = {};
  key.value = value;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = (event) => {
    if (event.key === key.value) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
      event.preventDefault();
    }
  };

  //The `upHandler`
  key.upHandler = (event) => {
    if (event.key === key.value) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
      event.preventDefault();
    }
  };

  //Attach event listeners
  const downListener = key.downHandler.bind(key);
  const upListener = key.upHandler.bind(key);

  window.addEventListener('keydown', downListener, false);
  window.addEventListener('keyup', upListener, false);

  // Detach event listeners
  key.unsubscribe = () => {
    window.removeEventListener('keydown', downListener);
    window.removeEventListener('keyup', upListener);
  };

  return key;
}



const Car = (props) => {
  // position from state (unused)

  //carRef: car's property in scene (read only)
  //api: car's physics object (methods to set/subscribe)
    const [carRef, api] = useBox(() => ({mass:1, args:[4.7, 1.3, 2], ...props}))
    const gltf = useLoader(GLTFLoader, car)

    // console.log('car model', gltf)
    // console.log('carref', carRef)
    console.log('api', api)
  const cameraRef = useRef()

  useFrame(() => {
    api.velocity.set(0,0,0)
    if (props.action === 'right') {
      api.velocity.set(25,-10,0);
      api.rotation.set(0, (Math.PI * 180/180), 0)
    }
    if (props.action === 'left') {
      api.velocity.set(-25,-10,0);
      api.rotation.set(0, (Math.PI * -0/180), 0)
    }
    if (props.action === 'up') {
      api.velocity.set(0,-10,-25);
      api.rotation.set(0, (Math.PI * -90/180), 0)
    }
    if (props.action === 'down') {
      api.velocity.set(0,-10,25);
      api.rotation.set(0, (Math.PI * 90/180), 0)
    }
  })

  return (

    <>

      <mesh ref={carRef}>
        <PerspectiveCamera position={[0.7,0.35,0]} rotation={[0, Math.PI*90/180, 0]} makeDefault={true} />
        <boxBufferGeometry attach="geometry" args={[4.7, 1.3, 2]} />
          <primitive object={gltf.scene} scale={[10,10,10]} position={[1.8, 0, -1.825]} rotation={ [ 0, (Math.PI * -45/180), 0 ]} />
          <meshStandardMaterial wireframe={true} attach="material" />
      </mesh>
    </>
    )
  }


export default Car
