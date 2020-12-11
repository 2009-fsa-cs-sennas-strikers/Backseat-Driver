import React from 'react'
import Game from './ThreeJs/Game'
import Title from './components/TitleScreen'
import NoPermission from './components/NoPermission'
import firebase from "firebase/app";
import "firebase/firestore";
import { connect } from 'react-redux'
import { getGameState, updateGameState } from './store/gameState'
import WinScreen from './components/WinScreen'
import Stopwatch from './ThreeJs/Stopwatch'
import AudioPlayer from './components/AudioPlayer'

class App extends React.Component{
    constructor(){
      super()
      this.state = {
        granted: ''
      }
      this.changePlaying = this.changePlaying.bind(this)
      this.changeWin = this.changeWin.bind(this)
    }

    componentDidMount(){
      this.askPermission()
    }

    changePlaying(){
      const gameState = this.props.gameState
      this.props.updateGameState({
        ...gameState,
        isPlaying: !gameState.isPlaying
      })
    }

    changeWin(){
      const gameState = this.props.gameState
      this.props.updateGameState({
        ...gameState,
        isPlaying: false,
        hasWon: true
      })
    }
  askPermission(){
    return navigator.mediaDevices.getUserMedia({audio: true}).then(() => {
      this.getPermission().then((permis) => {
        this.setState({
          granted: permis.state
        })
      })
    }).catch(() => {
      this.getPermission().then((permis) => {
        this.setState({
          granted: permis.state
        })
      })
    })
  }

  async getPermission (){
     const permissionStatus = await navigator.permissions.query({name: 'microphone'})
     return permissionStatus
    }


  renderSwitch(permiss){
    if (this.props.gameState.hasWon && !(this.props.gameState.isPlaying)){
      return <WinScreen changeWin={this.changeWin} changePlaying={this.changePlaying} />
    } else {
    switch(permiss){
      case 'granted':
        return this.props.gameState.isPlaying ?  <Game changeWin={this.changeWin} changePlaying={this.changePlaying} /> : <Title changePlaying={this.changePlaying}/>
      case 'denied':
        return <NoPermission />
      default:
        this.askPermission()
      return (
        this.props.gameState.isPlaying ?  <Game /> : <Title changePlaying={this.changePlaying}/>)
    }
  }
  }

  render() {
  return (
    <>
    <AudioPlayer />
    {this.renderSwitch(this.state.granted)}
    {this.props.gameState.isPlaying ? <Stopwatch /> : null}
    </>
  )
  }

}

const mapState = (state) => ({
  gameState: state.gameState
})

const mapDispatch = (dispatch) => ({
  getGameState: () => dispatch(getGameState()),
  updateGameState: (newGameState) => dispatch(updateGameState(newGameState))
})

export default connect(mapState,mapDispatch)(App)
