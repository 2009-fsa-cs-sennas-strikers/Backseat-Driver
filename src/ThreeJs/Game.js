import React, { Suspense, } from 'react'
import { Canvas } from 'react-three-fiber'
import { loadModel, startListening } from '../tenserFlow'
import { Stars, OrbitControls} from 'drei'
import {Physics} from 'use-cannon'
import Car from './Car'
import Box from './Box'
import Plane from './PlaneofExistence'
import Viewport from './Viewport'
import Block from './Block'
import BlockK from './BlockK'
import SidePlane from './SidePlane'
import EndZone from './EndZone'
import Stopwatch from './Stopwatch'

class Game extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
          action: '',
          endPosition: {}
        }
        this.voiceAction = this.voiceAction.bind(this);
        this.updatePosition = this.updatePosition.bind(this);
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

      // function to pass EndZone Position
      // up to parent as props
      updatePosition(endPosition) {
        this.setState({
          endPosition: endPosition
        })
      }

render() {
return (
  <>
   <Stopwatch />
   <Canvas>
        {/* <OrbitControls /> */}
        <Stars />
        <ambientLight intensity={0.5} />
        <spotLight castShadow intensity={1.5} position={[300, 300, 400]} />
        <Physics gravity={[0, -100, 0]}>
          <Plane rotation={[-(Math.PI/2), 0, 0]} />
          <Suspense fallback={<Box />}>
          {<Car action={this.state.action} position={[0,0,100]} />}
          </Suspense>
          <EndZone />
          {/* One Row */}
          <Block position={[-125,5,100]}/>
          <Block position={[-75,5,100]}/>
          <Block position={[-25,5,100]}/>
          <Block position={[25,5,100]}/>
          <Block position={[75,5,100]}/>
          <Block position={[125,5,100]}/>
          {/* One Row */}
          <Block position={[-125,5,50]}/>
          <Block position={[-75,5,50]}/>
          <Block position={[-25,5,50]}/>
          <Block position={[25,5,50]}/>
          <Block position={[75,5,50]}/>
          <Block position={[125,5,50]}/>
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
          <Block position={[-125,5,-100]}/>
          <Block position={[-75,5,-100]}/>
          <Block position={[-25,5,-100]}/>
          <Block position={[25,5,-100]}/>
          <Block position={[75,5,-100]}/>
          <Block position={[125,5,-100]}/>
          {/* One Row */}
          <SidePlane position={[0,0,-150]} />
          <SidePlane rotation={[0,Math.PI,0]} position={[0,0, 150]} />
          <SidePlane rotation={[0,-Math.PI/2,0]} position={[150,0,0]} />
          <SidePlane rotation={[0,Math.PI/2,0]} position={[-150,0,0]} />
        </Physics>
        {/* <Viewport /> */}
      </Canvas>
      </>
    )
}
}

export default Game
