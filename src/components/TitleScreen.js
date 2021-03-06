import React from 'react';
import Leaderboard from './leaderboard';

class Title extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.hoverSound = this.hoverSound.bind(this);
    this.selectSound = this.selectSound.bind(this);
    this.toggleLeaderboard = this.toggleLeaderboard.bind(this);
  }
  toggleSfx = new Audio('./sfx/toggle.mp3');
  selectSfx = new Audio('./sfx/select.mp3');

  hoverSound() {
    this.toggleSfx.volume = 0.5;
    this.toggleSfx.play();
  }

  selectSound() {
    this.selectSfx.volume = 0.5;
    this.selectSfx.play();
  }

  toggleLeaderboard() {
    this.selectSound();
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  render() {
    return (
      <div className="home">
        <div className="title">
          <h1>Backseat Driver</h1>
        </div>
        <div className="message">
          <h2>A voice-command driven 3D interactive simulation</h2>
          <p>Please backseat drive responsibly.</p>
        </div>
        <div id="button-row">
          <button
            id="play-button"
            onMouseOver={this.hoverSound}
            onClick={this.toggleLeaderboard}
          >
            Leaderboard
          </button>
          {this.state.showModal && (
            <Leaderboard
              showModal={this.state.showModal}
              toggleLeaderboard={this.toggleLeaderboard}
            />
          )}
          <button
            id="play-button"
            onMouseOver={() => this.hoverSound()}
            onClick={() => (this.props.changePlaying(), this.selectSound())}
          >
            Drive
          </button>
        </div>
        <div className="message">
          <p>
            backseat driver
            <br />
            <span id="defnoun">noun</span> : a passenger in a car who gives
            usually unwanted driving advice to the driver
          </p>
        </div>
      </div>
    );
  }
}

export default Title;
