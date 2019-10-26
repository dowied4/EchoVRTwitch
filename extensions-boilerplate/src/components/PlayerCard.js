import React, { Component } from 'react';
import { Card } from 'semantic-ui-react'

class PlayerCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        }
    }

    componentDidMount(){
        if (this.props.player && this.props.mouseInfo){
            this.setState({
                player: this.props.player,
                mouse: this.props.mouseInfo,
                loaded: true
            })
        }
    }

    componentDidUpdate(prevProps, prevState){
        console.log("Prev state: ", prevState)
        console.log("Current state: ", this.state)
        if(prevProps.mouseInfo !== this.props.mouseInfo) {
            this.setState({
                mouse: this.props.mouseInfo
            })
        }
    }

    render() { 
        
        if (this.state.loaded){
            console.log(this.state.mouseX)
            return ( 
                <div style={{position: 'fixed', left: this.state.mouse.mouseX - 75, bottom: 75}}>
                   <Card size="large" style={{height:"300px",zIndex:1000}}></Card>
                </div>
         );
        } else {
            return(
                <div></div>
            )
        }
    }
}
 
export default PlayerCard;