import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withApp } from 'react-pixi-fiber';
import Car from './Car';
import { loadModel, startListening } from '../tenserFlow';

// http://pixijs.io/examples/#/basics/basic.js
class Game extends Component {
  constructor() {
    super();
    this.state = {
      rotation: 0,
      vx: 0,
      vy: 0,
      x: 300,
      y: 400,
      speed: 0,
      action: '',
    };
    this.voiceAction = this.voiceAction.bind(this);
    this.contain = this.contain.bind(this);
  }

  voiceAction(command) {
    this.setState({
      action: command,
    });
    console.log('pixi game command:', this.state.action);
  }

  componentDidMount() {
    //passed down through Stage component
    this.props.app.ticker.add(this.animate);
    // loadModel();
    // startListening(this.voiceAction);
  }

  componentWillUnmount() {
    this.props.app.ticker.remove(this.animate);
  }

  ///contain function; pixijs
  //put helper functions in separate folder?
  contain(carState, container) {
    let collision = undefined;

    //Left
    if (carState.x < container.x) {
      this.setState({
        x: container.x,
        // vx: 0,
      });
      collision = 'left';
    }

    //Top
    if (carState.y < container.y) {
      this.setState({
        y: container.y,
        vy: 0,
      });
      collision = 'top';
    }

    //Right
    if (carState.x > container.width) {
      this.setState({
        x: container.width,
        vx: 0,
      });

      collision = 'right';
    }

    //Bottom
    if (carState.y > container.height) {
      this.setState({
        y: container.height,
        vy: 0,
      });
      collision = 'bottom';
    }
    //Return the `collision` value
    return collision;
  }

  //collision test function
  hitTestRectangle(r1, r2) {
    //Define the variables we'll need to calculate
    let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

    //hit will determine whether there's a collision
    hit = false;

    //Find the center points of each carState
    r1.centerX = r1.x + r1.width / 2;
    r1.centerY = r1.y + r1.height / 2;
    r2.centerX = r2.x + r2.width / 2;
    r2.centerY = r2.y + r2.height / 2;

    //Find the half-widths and half-heights of each carState
    r1.halfWidth = r1.width / 2;
    r1.halfHeight = r1.height / 2;
    r2.halfWidth = r2.width / 2;
    r2.halfHeight = r2.height / 2;

    //Calculate the distance vector between the carStates
    vx = r1.centerX - r2.centerX;
    vy = r1.centerY - r2.centerY;

    //Figure out the combined half-widths and half-heights
    combinedHalfWidths = r1.halfWidth + r2.halfWidth;
    combinedHalfHeights = r1.halfHeight + r2.halfHeight;

    //Check for a collision on the x axis
    if (Math.abs(vx) < combinedHalfWidths) {
      //A collision might be occurring. Check for a collision on the y axis
      if (Math.abs(vy) < combinedHalfHeights) {
        //There's definitely a collision happening
        hit = true;
      } else {
        //There's no collision on the y axis
        hit = false;
      }
    } else {
      //There's no collision on the x axis
      hit = false;
    }

    //`hit` will be either `true` or `false`
    return hit;
  }

  animate = (delta) => {
    //animate function creates a response 60fps

    this.contain(this.state, { x: 20, y: 20, width: 780, height: 580 });
    //changes with voice.
    //how do we make it respond with 90º orientation?
    //'left, then another left' = left, then down

    //Left arrow key `press` method
    // if (this.state.action === 'go') {
    //   this.setState({
    //     speed: 3,
    //   });
    // }
    // if (this.state.action === 'stop') {
    //   this.setState({
    //     speed: 0,
    //   });
    // }

    // if (this.state.action === 'left') {
    //   this.setState({
    //     vx: -3,
    //     vy: 0,
    //     rotation: Math.PI * 2 * (3 / 4),
    //   });
    // }
    // if (this.state.action === 'up') {
    //   this.setState({
    //     vy: -3,
    //     vx: 0,
    //     rotation: 0,
    //   });
    // }
    // if (this.state.action === 'right') {
    //   this.setState({
    //     vx: 3,
    //     vy: 0,
    //     rotation: Math.PI * 2 * (1 / 4),
    //   });
    // }
    // if (this.state.action === 'down') {
    //   this.setState({
    //     vy: 3,
    //     vx: 0,
    //     rotation: Math.PI * 2 * (1 / 2),
    //   });
    // }

    // Capture the keyboard arrow keys
    let left = this.keyboard('ArrowLeft'),
      up = this.keyboard('ArrowUp'),
      right = this.keyboard('ArrowRight'),
      down = this.keyboard('ArrowDown');

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
        {...this.state}
        // x={this.state.x}
        // y={this.state.y}
        // rotation={this.state.rotation}
      />
    );
  }
}

export default withApp(Game);
