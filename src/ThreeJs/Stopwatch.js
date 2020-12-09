import React from 'react';
import { connect } from 'react-redux'

class Stopwatch extends React.Component {
  constructor() {
    super();
    this.state = {
      startTime: performance.now(),
      elapsedTime: '',
      //get elapsedTime
    };
  }

  timer = 0
  componentDidMount() {
    //if paused, calculate the pause time (dont subtract and display until unpaused)
    //while paused, elapsedTime = elapsedTime - pauseTime.
    console.log('mount gamestate', this.props.gameState)
    //if ...startTimer when isPlaying is true,
    // if (this.props.gameState.isPlaying) {
    this.timer = setInterval(() => {
      let elapsedTime =
        Math.floor(performance.now() - this.state.startTime) / 1000;
      this.setState({
        elapsedTime,
      });
      let minutes, seconds, milliseconds;
      minutes = Math.floor(elapsedTime / 60).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }); //00 always two digits
      seconds = Math.floor(elapsedTime - minutes * 60).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }); //00 always two digits
      milliseconds = Math.floor((elapsedTime % 1) * 100).toLocaleString(
        'en-US',
        { minimumIntegerDigits: 2, useGrouping: false }
      ); //always two digits
      //add penalty to elapsedTime
      //update state's elapsedTime for leaderboar
      document.getElementById(
        'elapsed-time'
      ).innerHTML = `${minutes}:${seconds}:${milliseconds}`;
      //else ...endTimer and display only elapsedTime with penalty
    }, 10);
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  resetTime() {
    this.setState({
      startTime: performance.now(),
    });
  }

  render() {
    return (
      <div id="stopwatch">
        <div id="elapsed-time" />
        <hr />
        <p id="elapsed-label">ELAPSED TIME</p>
      </div>
    );
  }
}

const mapState = (state) => ({
  gameState: state.gameState
})

export default connect(mapState)(Stopwatch);
