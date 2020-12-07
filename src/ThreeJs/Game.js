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

class Game extends React.Component{
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
{/*<Viewport />*/}
</Canvas>
    )
}
}

export default Game