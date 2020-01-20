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
			let style= {marginBottom: "5px", textAlign: "center", float: "right"}
			if (this.props.small) {
				style.transform = "scale(0.8)"
				style.transformOrigin = "right top"
			}
			return (
				<Grid style={{position: "relative", paddingTop: 5, zIndex:0, paddingTop: "3vh"}}>
					{this.state.renderPlayer ? <PlayerCard small={this.props.small} top={this.props.top} player={this.state.playerInfo} team={this.props.teamData} isOrange={true} mouseInfo={this.state.mouse}/> : null}
					<div
						onMouseLeave={() => this.props.mouseLeave()}
						size="mini"
						style={{width:"20%",marginBottom: "10px",marginTop: "10px", left: "20vw", position: "absolute", textAlign: "right"}}
					>
						{this.props.teamData.players.map((player, index) => {
							console.log(style)
						return(
							<Card key={index} style={style}>
								<PlayerLabel
									color="orange"
									player={player}
									style={{right:0, position: "absolute"}}
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
			let style= {marginBottom: "5px", textAlign: "center"}
			if (this.props.small) {
				style.transform = "scale(0.8)"
				style.transformOrigin = "left top"
			}
			return (
				<Grid style={{position: "relative",paddingTop: 5, zIndex:0, paddingTop: "3vh"}}>
					{this.state.renderPlayer ? <PlayerCard small={this.props.small} top={this.props.top} player={this.state.playerInfo} team={this.props.teamData} isOrange={false} mouseInfo={this.state.mouse}/> : null}
					<div
						onMouseLeave={() => this.props.mouseLeave()}
						size="mini"
						style={{width: "20%", marginBottom: "10px", marginTop: "10px", left:"110vh", position: "absolute"}}
					>
						{this.props.teamData.players.map((player, index) => (
							<Card key={index} style={style}>
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