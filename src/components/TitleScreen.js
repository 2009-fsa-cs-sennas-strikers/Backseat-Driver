import React from 'react';



class Title extends React.Component {
  constructor(props) {
    super(props);
    this.hoverSound = this.hoverSound.bind(this);
    this.selectSound = this.selectSound.bind(this);
  }
  toggleSfx = new Audio('./sfx/toggle.mp3');
  selectSfx = new Audio('./sfx/select.mp3')

  hoverSound() {
      this.toggleSfx.volume = 0.5;
      this.toggleSfx.play();
  }

  selectSound() {
    this.selectSfx.volume = 0.5;
      this.selectSfx.play();
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
        <button id="playButton" onMouseOver={()=>this.hoverSound()} onClick={() => (this.props.changePlaying(), this.selectSound())}>
          Drive
        </button>
      </div>
    );
  }
}

export default Title;
