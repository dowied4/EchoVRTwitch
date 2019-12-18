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

    buildStats(team){
        return(
            <Grid style={{margin: 2}}>
                <Grid.Row columns={2}>
                    <Grid.Column >
                        <Grid.Row className="card-header">{this.state.player.stats.points}</Grid.Row>
                        <Grid.Row className="header-label">POINTS</Grid.Row>
                    </Grid.Column>
                <Grid.Column className="header-percentage">{this.props.team.stats.points === 0 ? "0%" : Math.round((this.state.player.stats.points/this.props.team.stats.points)*100).toFixed(0) + '%'}</Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                    <Grid.Column >
                        <Grid.Row className="card-header">{this.state.player.stats.assists}</Grid.Row>
                        <Grid.Row className="header-label">ASSISTS</Grid.Row>
                    </Grid.Column>
                    <Grid.Column className="header-percentage">{this.props.team.stats.assists === 0 ? "0%" : Math.round((this.state.player.stats.assists/this.props.team.stats.assists)*100).toFixed(0) + '%'}</Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                    <Grid.Column >
                        <Grid.Row className="card-header">{this.state.player.stats.saves}</Grid.Row>
                        <Grid.Row className="header-label">SAVES</Grid.Row>
                    </Grid.Column>
                    <Grid.Column className="header-percentage">{this.props.team.stats.saves === 0 ? "0%" : Math.round((this.state.player.stats.saves/this.props.team.stats.saves)*100).toFixed(0) + '%'}</Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                    <Grid.Column >
                        <Grid.Row className="card-header">{this.state.player.stats.stuns}</Grid.Row>
                        <Grid.Row className="header-label">STUNS</Grid.Row>
                    </Grid.Column>
                    <Grid.Column className="header-percentage">{this.props.team.stats.stuns === 0 ? "0%" : Math.round((this.state.player.stats.stuns/this.props.team.stats.stuns)*100).toFixed(0) + '%'}</Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                    <Grid.Column >
                        <Grid.Row className="team-tag" style={{color: team === "blue" ? '#1f9ce4' : "#e9a220"}}>
                            {this.props.team.team}
                        </Grid.Row>
                        <Grid.Row className="player-name">
                            {this.state.player.name}
                        </Grid.Row>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

    render() {
        let topOff
        if(this.state.loaded){
           topOff = this.props.top ? this.state.mouse.mouseY + 25 : this.state.mouse.mouseY - 475
        }
        if (this.state.loaded && this.state.isOrange){
            return (
                   <Card raised size="large" className="grid-background-orange" style={{background: "#283131",color: "white", fontSize: "large", position: 'fixed', left: this.state.mouse.mouseX + 20, top: topOff,width: 325,  zIndex: 10}} >
                       <Card.Content>
                        {this.buildStats("orange")}
                   </Card.Content>
                   </Card>
         );
        } else if (this.state.loaded && !this.state.isOrange){
            return (
                <Card raised size="large" className="grid-background-blue" style={{background: "#283131",color: "white", fontSize: "large", position: 'fixed', left: this.state.mouse.mouseX - 345, top: topOff,width: 325, zIndex: 10}}>
                    <Card.Content>
                        {this.buildStats("blue")}
                    </Card.Content>
                </Card>)
            ;
        } else {
           return ( null);
        }
    }
}
 
export default PlayerCard;