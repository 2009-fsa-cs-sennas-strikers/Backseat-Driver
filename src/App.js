import React from 'react'
import Game from './ThreeJs/Game'
import Title from './TitleScreen'
import NoPermission from './NoPermission'
import firebase from "firebase/app";
import "firebase/firestore";

class App extends React.Component{
    constructor(){
      super()
      this.state = {
        isPlaying: false,
        granted: ''
      }
      this.changePlaying = this.changePlaying.bind(this)
    }

    componentDidMount(){
      this.askPermission()
    }

    changePlaying(){
      this.setState({
        isPlaying: true
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
    switch(permiss){
      case 'granted':
        return this.state.isPlaying ?  <Game /> : <Title changePlaying={this.changePlaying}/>
      case 'denied':
        return <NoPermission />
      default:
        this.askPermission()
      return (
        this.state.isPlaying ?  <Game /> : <Title changePlaying={this.changePlaying}/>)
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

export default App
