import React from 'react'



class Title extends React.Component {
    constructor(props){
        super(props)
    }
    

    render(){
        return (<div id="home">
        <div id="title">BackSeat Driver</div>
        <button id="playButton" onClick={() => this.props.changePlaying()}>Testing</button>
        <div id="github">
            <a href="https://github.com/2009-fsa-cs-sennas-strikers/Backseat-Driver">
                <img src="github.png"/>
            </a>
        </div>
        </div>)
    }
}



export default Title