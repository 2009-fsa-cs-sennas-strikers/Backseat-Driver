import React, { Suspense, } from 'react'
import { Canvas } from 'react-three-fiber'
import { Stars} from 'drei'
import {Physics} from 'use-cannon'
import Car from './ThreeJs/Car'
import Box from './ThreeJs/Box'
import Plane from './ThreeJs/PlaneofExistence'
import './App.css';
import firebase from './firebase'
import { loadModel, startListening } from './tenserFlow'
import Viewport from './ThreeJs/Viewport'
import Block from './ThreeJs/Block'
import BlockK from './ThreeJs/BlockK'
import SidePlane from './ThreeJs/SidePlane'

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

  render() {
  return (
    <>
      <Canvas>
        <Stars />
        <ambientLight intensity={0.5} />
        <spotLight castShadow intensity={1.5} position={[300, 300, 400]} />
        <Physics >
          <Plane rotation={[-(Math.PI/2), 0, 0]} />
          <Suspense fallback={<Box />}>{<Car action={this.state.action}/>}</Suspense>
          <Block position={[-25,2.5,0]}/>
          <Block position={[-20,2.5,0]}/>
          <Block position={[-15,2.5,0]}/>
          <Block position={[-10,2.5,0]}/>
          <Block position={[-5,2.5,0]}/>
          <BlockK position={[25,2.5,0]}/>
          <BlockK position={[20,2.5,0]}/>
          <BlockK position={[15,2.5,0]}/>
          <BlockK position={[10,2.5,0]}/>
          <BlockK position={[5,2.5,0]}/>
          <SidePlane position={[0,0,-50]} />
          <SidePlane rotation={[0,Math.PI,0]} position={[0,0, 50]} />
          <SidePlane rotation={[0,-Math.PI/2,0]} position={[50,0,0]} />
          <SidePlane rotation={[0,Math.PI/2,0]} position={[-50,0,0]} />
        </Physics >
        <Viewport />
      </Canvas>
    </>
  )
  }

}

export default App
