import React from 'react'
import firebase from './firebase'
import Game from './ThreeJs/Game'
import Title from './TitleScreen'
import NoPermission from './NoPermission'
import WinScreen from './WinScreen'


class App extends React.Component{
    constructor(){
      super()
      this.state = {
        isPlaying: false,
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
      this.setState({
        isPlaying: !(this.state.isPlaying)
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
        return this.state.isPlaying ?  <Game changeWin={this.changeWin} changePlaying={this.changePlaying} /> : <Title changePlaying={this.changePlaying}/>
      case 'denied':
        return <NoPermission />
      default:
        this.askPermission()
      return (
        this.state.isPlaying ?  <Game /> : <Title changePlaying={this.changePlaying}/>)
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

export default App
