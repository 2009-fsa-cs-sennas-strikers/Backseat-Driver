import React from 'react'


class Stopwatch extends React.Component {
  constructor() {
    super()
    this.state ={
      startTime: performance.now()
      //get elapsedTime
    }
  }
  componentDidMount() {

    //if ...startTimer when isPlaying is true,
    setInterval(()=>{
      let elapsedTime = Math.floor(performance.now()  - this.state.startTime)/1000;
      let minutes, seconds, milliseconds;
      minutes = Math.floor(elapsedTime/60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) //00 always two digits
      seconds = Math.floor(elapsedTime - (minutes*60)).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) //00 always two digits
      milliseconds = Math.floor(elapsedTime%1*100).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) //always two digits
      //add penalty to elapsedTime
      //update state's elapsedTime for leaderboar
      document.getElementById('elapsed-time').innerHTML = `${minutes}:${seconds}:${milliseconds}`
    //else ...endTimer and display only elapsedTime with penalty


    }, 10)
  }

  resetTime() {
    this.setState({
      startTime: performance.now()
    })
  }



  render() {
    return(
        <div id="stopwatch">
          <div id="elapsed-time" />
          <hr />
           <p id="elapsed-label">ELAPSED TIME</p>
        </div>
    )
  }
}

export default Stopwatch;
