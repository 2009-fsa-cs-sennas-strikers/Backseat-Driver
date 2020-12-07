import React from 'react'
import firebase from './firebase'
import Game from './ThreeJs/Game'
import Title from './TitleScreen'

class App extends React.Component{
    constructor(){
      super()
      this.state = {
        isPlaying: false
      }
      this.changePlaying = this.changePlaying.bind(this)
    }
    changePlaying(){
      this.setState({
        isPlaying: true
      })
    }


  render() {
  return (
    <>
    {this.state.isPlaying ?  <Game /> : <Title changePlaying={this.changePlaying}/>}
    </>
  )
  }

}

export default App
