import React, { Component } from 'react';
import { Card, Segment, Grid } from 'semantic-ui-react'

class PlayerCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        }
        this.buildStats = this.buildStats.bind(this)
    }

    componentDidMount(){
        if (this.props.player && this.props.mouseInfo){
            var playerMod = this.props.player
            playerMod.stats.possession_time = (Math.round(this.props.player.stats.possession_time *10)/10).toFixed(1)
            this.setState({
                player: playerMod,
                mouse: this.props.mouseInfo,
                isOrange: this.props.isOrange,
                loaded: true
            })
        }
    }

    componentDidUpdate(prevProps, prevState){
        // console.log("Prev state: ", prevState)
        // console.log("Current state: ", this.state)
        if(prevProps.mouseInfo !== this.props.mouseInfo) {
            this.setState({
                mouse: this.props.mouseInfo
            })
        }
    }

    buildStats(){
        return(
            <Grid style={{margin: 2}}>
                <Grid.Row columns={4}>
                    <Grid.Column className="card-header"><h5>Assists:</h5></Grid.Column>
                    <Grid.Column>{this.state.player.stats.assists}</Grid.Column>
                    <Grid.Column className="card-header"><h5>Blocks:</h5></Grid.Column>
                    <Grid.Column>{this.state.player.stats.blocks}</Grid.Column>
                </Grid.Row>
                <Grid.Row columns={4}>
                    <Grid.Column className="card-header"><h5>Catches:</h5></Grid.Column>
                    <Grid.Column>{this.state.player.stats.catches}</Grid.Column>
                    <Grid.Column className="card-header"><h5>Goals:</h5></Grid.Column>
                    <Grid.Column>{this.state.player.stats.goals}</Grid.Column>
                </Grid.Row>
                <Grid.Row columns={4}>
                    <Grid.Column className="card-header"><h5>Interceptions:</h5></Grid.Column>
                    <Grid.Column >{this.state.player.stats.interceptions}</Grid.Column>
                    <Grid.Column className="card-header"><h5>Passes:</h5></Grid.Column>
                    <Grid.Column>{this.state.player.stats.passes}</Grid.Column>
                </Grid.Row>
                <Grid.Row columns={4}>
                    <Grid.Column className="card-header"><h5>Points:</h5></Grid.Column>
                    <Grid.Column>{this.state.player.stats.points}</Grid.Column>
                    <Grid.Column className="card-header"><h5>Possession:</h5></Grid.Column>
                    <Grid.Column>{this.state.player.stats.possession_time}</Grid.Column>
                </Grid.Row>
                <Grid.Row columns={4}>
                    <Grid.Column className="card-header"><h5>Saves:</h5></Grid.Column>
                    <Grid.Column>{this.state.player.stats.saves}</Grid.Column>
                    <Grid.Column className="card-header"><h5>Shots:</h5></Grid.Column>
                    <Grid.Column>{this.state.player.stats.shots_taken}</Grid.Column>
                </Grid.Row>
                <Grid.Row columns={4}>
                    <Grid.Column className="card-header"><h5>Steals:</h5></Grid.Column>
                    <Grid.Column>{this.state.player.stats.steals}</Grid.Column>
                    <Grid.Column className="card-header"><h5>Stuns:</h5></Grid.Column>
                    <Grid.Column>{this.state.player.stats.stuns}</Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

    render() { 
        if (this.state.loaded && this.state.isOrange){
            return (
                   <Card raised size={"large"} style={{background: "rgba(73, 73, 73, 0.9)",color: "white", fontSize: "large", position: 'fixed', left: this.state.mouse.mouseX + 20, top: this.state.mouse.mouseY - 410,width: 500,  zIndex: 10}} >
                       <Card.Content>
                            <h1 style={{textAlign:'center'}}>{this.state.player.name}</h1>
                        {this.buildStats()}
                   </Card.Content>
                   </Card>
         );
        } else if (this.state.loaded && !this.state.isOrange){
            return (
                <Card raised size={"large"} style={{background: "rgba(73, 73, 73, 0.9)",color: "white", fontSize: "large", position: 'fixed', left: this.state.mouse.mouseX - 520, top: this.state.mouse.mouseY -390,width: 500, zIndex: 10}}>
                    <Card.Content>
                        <h1 style={{textAlign:'center'}}>{this.state.player.name}</h1>
                        {this.buildStats()}
                    </Card.Content>
                </Card>)
            ;
        } else {
           return ( null);
        }
    }
}
 
export default PlayerCard;