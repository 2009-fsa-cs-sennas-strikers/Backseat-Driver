import React from 'react';
import { connect } from 'react-redux';
import { fetchLeaderboard } from '../store/leaderboard';
import { Modal, Table } from 'react-bootstrap'

class Leaderboard extends React.Component{

  componentDidMount() {
    this.props.fetchLeaderboard()
  }
  render() {
    return (
      <Modal show={this.props.showModal}>
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
              this.props.leaderboard.length ? (
                this.props.leaderboard.map((record, idx) => (
                  <tr key={idx}>
                    <td>{record.name}</td>
                    <td>{record.score}</td>
                  </tr>
                ))
                ) : (<div>Loading</div>)
              }
          </tbody>
        </Table>
        <button onClick={this.props.toggleLeaderboard}>Close Leaderboard</button>
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
