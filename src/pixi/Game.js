import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withApp } from 'react-pixi-fiber';
import Car from './Car';

// http://pixijs.io/examples/#/basics/basic.js
class Game extends Component {
  state = {
    rotation: 0,
    vx: 0,
    vy: 0,
    x: 0,
    y: 0,
  };

  componentDidMount() {
    this.props.app.ticker.add(this.animate);
  }

  componentWillUnmount() {
    this.props.app.ticker.remove(this.animate);
  }

  animate = (delta) => {
    //animate function creates a response 60fps

    // this.setState((state) => ({
    //   ...state,
    //   rotation: state.rotation + 0.1 * delta,
    // }));

    //Capture the keyboard arrow keys
    let left = this.keyboard('ArrowLeft'),
      up = this.keyboard('ArrowUp'),
      right = this.keyboard('ArrowRight'),
      down = this.keyboard('ArrowDown');

    //changes with voice.
    //how do we make it respond with 90º orientation?
    //'left, then another left' = left, then down

    //Left arrow key `press` method
    left.press = () => {
      //Change the velocity when the key is pressed
      this.setState({
        vx: -5,
        vy: 0,
      });
    };

    //Left arrow key `release` method
    left.release = () => {
      //If the left arrow has been released, and the right arrow isn't down,
      //and the cat isn't moving vertically:
      //Stop the cat
      if (!right.isDown && this.state.vy === 0) {
        this.setState({ vx: 0 });
      }
    };

    //Up
    up.press = () => {
      this.setState({
        vy: -5,
        vx: 0,
      });
    };
    up.release = () => {
      if (!down.isDown && this.state.vx === 0) {
        this.setState({ vy: 0 });
      }
    };

    //Right
    right.press = () => {
      this.setState({
        vx: 5,
        vy: 0,
      });
    };
    right.release = () => {
      if (!left.isDown && this.state.vy === 0) {
        this.setState({ vx: 0 });
      }
    };

    //Down
    down.press = () => {
      this.setState({
        vy: 5,
        vx: 0,
      });
    };
    down.release = () => {
      if (!up.isDown && this.state.vx === 0) {
        this.setState({
          vy: 0,
        });
      }
    };
    this.setState((prevState) => ({
      x: (prevState.x += prevState.vx),
      y: (prevState.y += prevState.vy),
    }));
  };

  keyboard(value) {
    let key = {};
    key.value = value;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = (event) => {
      if (event.key === key.value) {
        if (key.isUp && key.press) key.press();
        key.isDown = true;
        key.isUp = false;
        event.preventDefault();
      }
    };

    //The `upHandler`
    key.upHandler = (event) => {
      if (event.key === key.value) {
        if (key.isDown && key.release) key.release();
        key.isDown = false;
        key.isUp = true;
        event.preventDefault();
      }
    };

    //Attach event listeners
    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);

    window.addEventListener('keydown', downListener, false);
    window.addEventListener('keyup', upListener, false);

    // Detach event listeners
    key.unsubscribe = () => {
      window.removeEventListener('keydown', downListener);
      window.removeEventListener('keyup', upListener);
    };

    return key;
  }

  render() {
    return (
      <Car
        {...this.props}
        x={this.state.x}
        y={this.state.y}
        // rotation={this.state.rotation}
      />
    );
  }
}

export default withApp(Game);
