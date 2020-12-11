import React from 'react'
import { connect } from 'react-redux'
import { addRecordToDb } from '../store/leaderboard';
import { getGameState, updateGameState, resetGameState } from '../store/gameState'

class WinScreen extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name: ''
        }
        this.submitScore = this.submitScore.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.resetGame = this.resetGame.bind(this)
    }

    handleChange(e) {
        this.setState({
            name: e.target.value
        })
    }

    submitScore(e) {
        e.preventDefault()
        this.props.addToLeaderboard({
            name: this.state.name,
            score: this.props.time
        })
    }

    resetGame() {
        this.props.resetGame()
    }

    render(){
        return (
            <div id="home">
                <div id="title">You Win</div>
                <button id="playButton" onClick={this.resetGame}>Play again?</button>
                <div>
                    <h4>Good Job! Your time is {this.props.time}</h4>
                    <h3>Add to leaderboard?</h3>
                    <form onSubmit={(e) => this.submitScore(e)}>
                        <label htmlFor='name'>Name</label>
                        <input name='name' type='text' value={this.state.name} onChange={(e) => this.handleChange(e)}/>
                        <input type='submit'/>
                    </form>
                </div>
                <div id="github">
                    <a href="https://github.com/2009-fsa-cs-sennas-strikers/Backseat-Driver">
                        <img src="github.png"/>
                    </a>
                </div>
            </div>
        )
    }
}

const mapState = (state) => ({
    time: state.time
})

const mapDispatch = (dispatch) => ({
    addToLeaderboard: (score) => dispatch(addRecordToDb(score)),
    resetGame: () => dispatch(resetGameState())
})

export default connect(mapState, mapDispatch)(WinScreen)
