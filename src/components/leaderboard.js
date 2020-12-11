import React from 'react';
import { connect } from 'react-redux';
import { fetchLeaderboard } from '../store/leaderboard';
import { Modal, Table } from 'react-bootstrap'

class Leaderboard extends React.Component{

  componentDidMount() {
    this.props.fetchLeaderboard()
    console.log('Loading leaderboard')
  }

  render() {
    const leaderboard = this.props.leaderboard || []
    return (
      <Modal show={this.props.showModal}>
        <div>

          <h1>Leaderboard</h1>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {
                leaderboard.map((record, idx) => (
                  <tr key={idx}>
                    <td>{record.name}</td>
                    <td>{record.score}</td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </div>
        <div>
          <button onClick={this.props.toggleLeaderboard}>Close
        Leaderboard</button>
        </div>
      </Modal>
    )
  }
}

const mapState = (state) => ({
  leaderboard: state.leaderboard
})

const mapDispatch = (dispatch) => ({
  fetchLeaderboard: () => dispatch(fetchLeaderboard())
})

export default connect(mapState, mapDispatch)(Leaderboard)

