import React, { useState, useRef } from 'react'
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
  // position from state
  const [position, setPosition] = useState({x:0, y:1, z:0})
  const {x,y,z} = position
  //carRef = three car in scene
  //api = car's physics object
    const [carRef, api] = useBox(() => ({mass:0.5}))
    // const carRef = useRef()
    const gltf = useLoader(GLTFLoader, car)

    const vec = new THREE.Vector3(x,y,z)

    console.log('car model', gltf)
    console.log('carref', carRef)
    console.log('api', api)
  useFrame(() => {
    if (props.action === 'right' && x < 500) {
      api.velocity.set(15,0,0);
      api.rotation.set(0, (Math.PI * 135/180), 0)
    }
    if (props.action === 'left' && x > -500) {
      api.velocity.set(-15,0,0);
      api.rotation.set(0, (Math.PI * -45/180), 0)
    }
    if (props.action === 'up' && z > -500) {
      api.velocity.set(0,0,-15);
      api.rotation.set(0, (Math.PI * 225/180), 0)
    }
    if (props.action === 'down' && z < 500) {
      api.velocity.set(0,0,15);
      api.rotation.set(0, (Math.PI * 45/180), 0)
    }
    carRef.current.position.lerp(vec, 0.1)

    // carRef.current.rotation.x = lerp(carRef.current.rotation.x, (Math.PI / 2), 0.1)
  });
    return (
      
      <>
    <PerspectiveCamera position={[position.x/10,0.1,position.z/10]} makeDefault={true} />
    <primitive ref={carRef} object={gltf.scene} scale={[10,10,10]} position={[0, 1, 0]} rotation={ [ 0, (Math.PI * -45/180), 0 ]} />
    {/* <OrbitControls screenSpacePanning /> */}
    </>
    )
  }


export default Car
