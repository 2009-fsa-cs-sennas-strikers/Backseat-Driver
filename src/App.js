import React, { Suspense, useState, useRef } from 'react'
import * as THREE from 'three'
import { Canvas } from 'react-three-fiber'
import { OrbitControls, Stars} from 'drei'
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
import Viewport from './ThreeJs/Viewport'
import Block from './ThreeJs/Block'

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
      {/* <div className="pixi">
        <Stage options={options}>
          <Game vHeight={options.height} vWidth={options.width} action={this.state.action}/>
        </Stage>
      </div> */}
      <Canvas>
        <Stars />
        <ambientLight intensity={0.5} />
        <spotLight castShadow intensity={1.5} position={[300, 300, 400]} />
        <Physics >
          <Plane />
          <Suspense fallback={<Box />}>{<Car action={this.state.action}/>}</Suspense>
          <Block position={[-25,0,0]}/>
          <Block position={[-25,0,0]}/>
          <Block position={[-25,0,0]}/>
          <Block position={[-25,0,0]}/>
          <Block position={[-25,0,0]}/>
        </Physics >
        <OrbitControls />
        <Viewport />
      </Canvas>
    </>
  )
  }

}

export default App
