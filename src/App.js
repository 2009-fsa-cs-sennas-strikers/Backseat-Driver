import React from 'react'
import firebase from './firebase'
import { loadModel, startListening } from './tenserFlow'
import Game from './ThreeJs/Game'

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
    <Game />
    </>
  )
  }

}

export default App
