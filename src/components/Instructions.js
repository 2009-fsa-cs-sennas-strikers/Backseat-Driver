import React from 'react';
import { Modal, Table } from 'react-bootstrap';

class Instructions extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: true,
    };
    this.toggleInstructions = this.toggleInstructions.bind(this);
  }

  toggleInstructions() {
    this.setState((prevState)=>({
      showModal: !prevState.showModal
    }));
  }

  render() {
    return (
      <>
          <button id="instruction-button" onClick={this.toggleInstructions}>
           i
          </button>

        <Modal
          centered
          show={this.state.showModal}
          onHide={this.toggleInstructions}
          dialogClassName="instruction-modal"
        >
          <div>
            <h1>Driving simulation requires use of device microphone</h1>
            <p>How to play:
              Navigate from your start position to the yellow end zone.
              Only clear, concise verbal commands will drive the car.
            </p>
            <Table responsive>
              <thead>
                <tr>
                  <th>Commands</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Go</td>
                  <td>Gas (Set in first gear)</td>
                </tr>
                <tr>
                  <td>Stop</td>
                  <td>Brake</td>
                </tr>
                <tr>
                  <td>Left</td>
                  <td>Attempt left turn</td>
                </tr>
                <tr>
                  <td>Right</td>
                  <td>Attempt right turn</td>
                </tr>
                <tr>
                  <td>Up</td>
                  <td>Accelerate</td>
                </tr>
                <tr>
                  <td>Down</td>
                  <td>Decelerate</td>
                </tr>
                <tr>
                  <td>Screen click</td>
                  <td>Allows use of panning camera (cursor lock)</td>
                </tr>
                <tr>
                  <td>ESC Key</td>
                  <td>Camera Lock (show cursor)</td>
                </tr>
              </tbody>
            </Table>
            <p>
              Please Note: Game rendering is based on device GPU. Best
              performance of game will be depenedent on device ability to render
              WebGL graphics.
            </p>
            <button onClick={this.toggleInstructions}>
              Close Instructions
            </button>
          </div>
        </Modal>
      </>
    );
  }
}

export default Instructions;
