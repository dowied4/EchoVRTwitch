import React, { Component } from 'react';
import { Segment, Label, Grid } from 'semantic-ui-react';
import PlayerCard from './PlayerCard'
import PlayerLabel from './PlayerLabel'

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
		} else if (this.props.teamData.team === "ORANGE TEAM") {
			return (
					<Grid style={{position: "relative", zIndex:0}}>
						{this.state.renderPlayer ? <PlayerCard player={this.state.playerInfo} isOrange={true} mouseInfo={this.state.mouse}/> : null}
						<div
							onMouseEnter={() => {console.log("hovering")}}
							onMouseLeave={() => this.props.mouseLeave()}
							size="mini"
							style={{width: "15%", marginBottom: "25px", marginLeft: "22%", position: "relative"}}
						>
							{this.props.teamData.players.map((player, index) => (
								<Grid.Row key={index} style={{marginBottom: "20px",textAlign: "center"}}>
									<PlayerLabel
										color={"orange"}
										player={player}
										key={index}
										onMouseMove={(e) => {this.setState({mouse:{mouseX: e.pageX, mouseY: e.pageY}})}}
										onMouseEnter={(player, e) => {this.setState({renderPlayer: true, playerInfo: player, mouse: {mouseX: e.pageX, mouseY: e.pageY}})}}
										onMouseLeave={() => this.setState({renderPlayer:false})}
									/>
								</Grid.Row>
							))}
						</div>
					</Grid>
			 );
		} return (
			<Grid style={{position: "relative", zIndex:0}}>
				{this.state.renderPlayer ? <PlayerCard player={this.state.playerInfo} isOrange={false} mouseInfo={this.state.mouse}/> : null}
				<div
					onMouseLeave={() => this.props.mouseLeave()}
					size="mini"
					style={{width: "15%", marginBottom: "25px", marginLeft: "63%", position: "relative"}}
				>
					{this.props.teamData.players.map((player, index) => (
						<Grid.Row key={index} style={{marginBottom: "20px", textAlign: "center"}}>
							<PlayerLabel
								color={"blue"}
								player={player}
								key={index}
								onMouseMove={(e) => {this.setState({mouse:{mouseX: e.pageX, mouseY: e.pageY}})}}
								onMouseEnter={(player, e) => {this.setState({renderPlayer: true, playerInfo: player, mouse: {mouseX: e.pageX, mouseY: e.pageY}})}}
								//onMouseLeave={() => this.setState({renderPlayer:false})}
							/>
						</Grid.Row>
					))}
				</div>
			</Grid>
		 );
	}
}

export default TeamBox;