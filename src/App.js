import React, { Suspense, useState, useRef } from 'react'
import * as THREE from 'three'
import { Canvas } from 'react-three-fiber'
import {OrbitControls, Stars} from 'drei'
import {Physics} from 'use-cannon'
import Car from './ThreeJs/Car'
import Box from './ThreeJs/Box'
import Plane from './ThreeJs/PlaneofExistence'
import Scene from './pixi/Scene';
import './App.css';
import firebase from './firebase'
import { loadModel, startListening } from './tenserFlow'
import { Stage } from 'react-pixi-fiber'
import Game from './pixi/Game'

const options = {
  backgroundColor: 0x1099bb,
  height: 600,
  width: 800,
  antialias: true, // default: false
  transparent: false, // default: false
  resolution: 1, // default: 1
};

class App extends React.Component{
  constructor(props) {
    super()
    this.state = {
      action: ''
    }
    this.voiceAction = this.voiceAction.bind(this)
  }

  componentDidMount() {
    loadModel()
    .then(() => startListening(this.voiceAction))
  }

  voiceAction(command) {
    this.setState({
      action: command,
    });
    console.log('voice command:', this.state.action);
  }

  // const [position, setPosition] = useState({x:1, y:0, z:0})
  // const {x,y,z} = position
  render() {
  return (
    <>
      <div className="pixi">
        <Stage options={options}>
          <Game vHeight={options.height} vWidth={options.width} action={this.state.action}/>
        </Stage>
      </div>
      <Canvas>
        <OrbitControls />
        <Stars />
        <ambientLight intensity={0.5} />
        <spotLight intensity={0.8} position={[300, 300, 400]} />
        <Physics >
        <Suspense fallback={<Box />}>{<Car action={this.state.action}/>}</Suspense>
        <Plane />
        </Physics >
      </Canvas>
    </>
  )
  }

}

export default App
