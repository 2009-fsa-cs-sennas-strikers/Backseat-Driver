import React, { Suspense, } from 'react'
import { Canvas } from 'react-three-fiber'
import { Stars, OrbitControls } from 'drei'
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
        {/* <OrbitControls /> */}
        <Stars />
        <ambientLight intensity={0.5} />
        <spotLight castShadow intensity={1.5} position={[300, 300, 400]} />
        <Physics gravity={[0, -100, 0]}>
          <Plane rotation={[-(Math.PI/2), 0, 0]} />
          <Suspense fallback={<Box />}>{<Car action={this.state.action}/>}</Suspense>
          {/* One Row */}
          <Block position={[-125,5,0]}/>
          <Block position={[-75,5,0]}/>
          <Block position={[-25,5,0]}/>
          <Block position={[25,5,0]}/>
          <Block position={[75,5,0]}/>
          <Block position={[125,5,0]}/>
          {/* One Row */}
          <Block position={[-125,5,50]}/>
          <Block position={[-75,5,50]}/>
          <Block position={[-25,5,50]}/>
          <Block position={[25,5,50]}/>
          <Block position={[75,5,50]}/>
          <Block position={[125,5,50]}/>
          {/* One Row */}
          <Block position={[-125,5,-50]}/>
          <Block position={[-75,5,-50]}/>
          <Block position={[-25,5,-50]}/>
          <Block position={[25,5,-50]}/>
          <Block position={[75,5,-50]}/>
          <Block position={[125,5,-50]}/>
          {/* One Row */}
          <SidePlane position={[0,0,-150]} />
          <SidePlane rotation={[0,Math.PI,0]} position={[0,0, 150]} />
          <SidePlane rotation={[0,-Math.PI/2,0]} position={[150,0,0]} />
          <SidePlane rotation={[0,Math.PI/2,0]} position={[-150,0,0]} />
        </Physics>
        <Viewport />
      </Canvas>
    </>
  )
  }

}

export default App
