import React from 'react'



class Title extends React.Component {
    constructor(props){
        super(props)
    }
    

    render(){
        return (<button onClick={() => this.props.changePlaying()}>Testing</button>)
    }
}



export default Title