import React, { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import { loadModel, startListening, stopListening } from '../tenserFlow';
import { Stars, OrbitControls } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import Car from './Car';
import Box from './Box';
import Plane from './PlaneofExistence';
import Viewport from './Viewport';
import Block from './Block';
import BlockK from './BlockK';
import SidePlane from './SidePlane';
import EndZone from './EndZone';
import WinScreen from '../components/WinScreen';
import Stopwatch from './Stopwatch';
import WorldLayout from './WorldLayout';
import store from '../store'

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: '',
      endPosition: {},
    };
    this.voiceAction = this.voiceAction.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
  }

  componentDidMount() {
    loadModel().then(() => startListening(this.voiceAction));
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
      endPosition: endPosition,
    });
  }

  render() {
    return (
      <>

        <Canvas concurrent sRGB gl={{ alpha: false }} colorManagement shadowMap>
          {/* <OrbitControls /> */}
          <Stars />
          <hemisphereLight intensity={0.5} />
          <ambientLight intensity={0.2} />
          <spotLight
            castShadow
            penumbra={1}
            intensity={2}
            position={[150, 300, -150]}
            lookAt={[0, 0, 300]}
            shadow-mapSize-width={512} shadow-mapSize-height={512}
            shadow-camera-near={0.1}
            shadow-camera-far={500}

          />
          <Physics gravity={[0, -100, 0]}>
            <Plane rotation={[-(Math.PI / 2), 0, 0]} />
            <EndZone store={store}/>
            <Suspense fallback={<Box />}>
              {
                <Car
                action={this.state.action}
                carPosition={[0, 1, 150]}
                stopListening={stopListening}
                changeWin={this.props.changeWin}
                changePlaying={this.props.changePlaying}
                store={store}
                />
              }
            </Suspense>
            <WorldLayout />
            <SidePlane position={[0, 0, -180]} />
            <SidePlane rotation={[0, Math.PI, 0]} position={[0, 0, 180]} />
            <SidePlane rotation={[0, -Math.PI / 2, 0]} position={[180, 0, 0]} />
            <SidePlane rotation={[0, Math.PI / 2, 0]} position={[-180, 0, 0]} />
          </Physics>
          {/* <Viewport /> */}
        </Canvas>
      </>
    );
  }
}

export default Game;
