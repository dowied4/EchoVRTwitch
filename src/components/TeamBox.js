import React, { Component } from 'react';
import { Segment, Label, Grid, Card } from 'semantic-ui-react';
import PlayerCard from './PlayerCard'
import PlayerLabel from './PlayerLabel'
import 'semantic-ui-css/semantic.min.css'

class TeamBox extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			renderPlayer: false,
			playerInfo: null,
			mouse: {
				mouseX: null,
				mouseY: null
			}
		}
	}

	componentDidMount(){
		// console.log(this.props.teamData)
	}

	render() {
		if(!this.props.teamData) {
			return (
				<div>Loading...</div>
			)
		} else if (this.props.teamIndex === 1) {
			return (
				<Grid style={{position: "relative", zIndex:0}}>
					{this.state.renderPlayer ? <PlayerCard top={this.props.top} player={this.state.playerInfo} team={this.props.teamData} isOrange={true} mouseInfo={this.state.mouse}/> : null}
					<div
						onMouseLeave={() => this.props.mouseLeave()}
						size="mini"
						style={{width:"15%",marginBottom: "10px",marginTop: "10px", marginLeft: "22%", position: "relative"}}
					>
						{this.props.teamData.players.map((player, index) => {
						return(
							<Card key={index} style={{marginBottom: "5px", textAlign: "center"}}>
								<PlayerLabel
									color={"orange"}
									player={player}
									key={index}
									onMouseMove={(e) => {this.setState({mouse:{mouseX: e.pageX, mouseY: e.pageY}})}}
									onMouseEnter={(player, e) => {this.setState({renderPlayer: true, playerInfo: player, mouse: {mouseX: e.pageX, mouseY: e.pageY}})}}
									onMouseLeave={() => this.setState({renderPlayer:false})}
								/>
							</Card>
						);
						})}
					</div>
				</Grid>
			);
		} else {
			return (
				<Grid style={{position: "relative", zIndex:0}}>
					{this.state.renderPlayer ? <PlayerCard top={this.props.top} player={this.state.playerInfo} team={this.props.teamData} isOrange={false} mouseInfo={this.state.mouse}/> : null}
					<div
						onMouseLeave={() => this.props.mouseLeave()}
						size="mini"
						style={{width: "15%", marginBottom: "10px", marginTop: "10px", marginLeft: "63%", position: "relative"}}
					>
						{this.props.teamData.players.map((player, index) => (
							<Card key={index} style={{marginBottom: "5px", textAlign: "center"}}>
								<PlayerLabel
									color="blue"
									player={player}
									key={index}
									onMouseMove={(e) => {this.setState({mouse:{mouseX: e.pageX, mouseY: e.pageY}})}}
									onMouseEnter={(player, e) => {this.setState({renderPlayer: true, playerInfo: player, mouse: {mouseX: e.pageX, mouseY: e.pageY}})}}
									onMouseLeave={() => this.setState({renderPlayer:false})}
								/>
							</Card>
						))}
					</div>
				</Grid>
			);
		}
	}
}

export default TeamBox;