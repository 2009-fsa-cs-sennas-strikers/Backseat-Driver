import React from 'react'



class Title extends React.Component {
    constructor(props){
        super(props)
    }


    render(){
        return (<div id="home">
        <div id="title"><h1>Backseat Driver</h1><h2>A voice-command driven 3D interactive simulation</h2></div>
        <div>Please backseat drive responsibly.</div>

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
