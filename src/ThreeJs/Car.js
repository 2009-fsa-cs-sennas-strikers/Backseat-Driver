import React, { useState, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useBox } from 'use-cannon'
import car from '../models/models/McLaren.glb'
import lerp from 'lerp'

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
    const [carRef, api] = useBox(() => ({type: 'Kinematic'}))
    // const carRef = useRef()
    const gltf = useLoader(GLTFLoader, car)
    const vec = new THREE.Vector3(x,y,z)
  useFrame(() => {
    if (props.action === 'right') {
      setPosition({
        x: x+2,
        z: z,
      });
      api.rotation.set(0, (Math.PI * 135/180), 0)
    }
    if (props.action === 'left') {
      setPosition({
        x: x-2,
        z: z,
      });
      api.rotation.set(0, (Math.PI * -45/180), 0)
    }
    if (props.action === 'up') {
      setPosition({
        x: x,
        z: z-2,
      });
      api.rotation.set(0, (Math.PI * 225/180), 0)
    }
    if (props.action === 'down') {
      setPosition({
        x: x,
        z: z+2,
      });
      api.rotation.set(0, (Math.PI * 45/180), 0)
    }
    carRef.current.position.lerp(vec, 0.1)
    // carRef.current.rotation.x = lerp(carRef.current.rotation.x, (Math.PI / 2), 0.1)
  });
    return <primitive ref={carRef} object={gltf.scene} scale={[10,10,10]} position={[0, 1, 0]} rotation={ [ 0, (Math.PI * -45/180), 0 ]} />
  }


export default Car
