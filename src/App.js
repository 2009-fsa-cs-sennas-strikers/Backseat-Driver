import React from 'react'
import Game from './ThreeJs/Game'
import Title from './TitleScreen'
import NoPermission from './NoPermission'
import firebase from "firebase/app";
import "firebase/firestore";
import { connect } from 'react-redux'
import { getGameState, updateGameState } from './store/gameState'
import WinScreen from './WinScreen'

class App extends React.Component{
    constructor(){
      super()
      this.state = {
        granted: '',
        win: false
      }
      this.changePlaying = this.changePlaying.bind(this)
      this.changeWin = this.changeWin.bind(this)
    }

    componentDidMount(){
      this.askPermission()
    }

    changePlaying(){
      this.props.updateGameState({
        ...this.props.gameState,
        isPlaying: true
      })
    }

    changeWin(){
      this.setState({
        win: !(this.state.win)
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
    if (this.state.win && !(this.state.playing)){
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
    {this.renderSwitch(this.state.granted)}
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
