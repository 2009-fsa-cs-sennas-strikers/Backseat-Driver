import React from 'react';

class WinScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="home">
        <div id="title"><h1>You Win</h1></div>
        <button
          id="playButton"
          onClick={() => (this.props.changeWin(), this.props.changePlaying())}
        >
          Play again?
        </button>
        <div id="github">
          <a href="https://github.com/2009-fsa-cs-sennas-strikers/Backseat-Driver">
            <img src="github.png" />
          </a>
        </div>
      </div>
    );
  }
}

export default WinScreen;
