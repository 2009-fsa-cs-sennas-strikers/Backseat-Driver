import React, { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import { loadModel, startListening, stopListening } from '../tensorflow';
import { Stars, useProgress, Html } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import Car from './Car';
import Plane from './PlaneofExistence';
import SidePlane from './SidePlane';
import EndZone from './EndZone';
import WorldLayout from './WorldLayout';
import store from '../store';
import RestartButton from '../components/RestartButton';

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="title">
        <h1>{progress.toFixed(2)}% Loaded</h1>
      </div>
    </Html>
  );
}

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
        <RestartButton />
        <Canvas colorManagement shadowMap>
          <Stars />
          <hemisphereLight intensity={0.5} />
          <ambientLight intensity={0.2} />
          <spotLight
            castShadow
            penumbra={1}
            intensity={2}
            position={[150, 300, -150]}
            lookAt={[0, 0, 300]}
            shadow-mapSize-width={512}
            shadow-mapSize-height={512}
            shadow-camera-near={0.1}
            shadow-camera-far={500}
          />
          <Physics gravity={[0, -100, 0]}>
            <Suspense fallback={<Loader />}>
              <Plane rotation={[-(Math.PI / 2), 0, 0]} />
              <EndZone store={store} />

              <Car
                action={this.state.action}
                carPosition={[0, 1, 150]}
                stopListening={stopListening}
                changeWin={this.props.changeWin}
                setAction={this.voiceAction}
                changePlaying={this.props.changePlaying}
                store={store}
              />

              <WorldLayout />
              <SidePlane position={[0, 0, -180]} />
              <SidePlane rotation={[0, Math.PI, 0]} position={[0, 0, 180]} />
              <SidePlane
                rotation={[0, -Math.PI / 2, 0]}
                position={[180, 0, 0]}
              />
              <SidePlane
                rotation={[0, Math.PI / 2, 0]}
                position={[-180, 0, 0]}
              />
            </Suspense>
          </Physics>
          {/* <Viewport /> */}
        </Canvas>
      </>
    );
  }
}

export default Game;
