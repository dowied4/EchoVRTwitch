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
						<Segment
							onMouseEnter={() => {console.log("hovering")}}
							onMouseLeave={() => this.props.mouseLeave()}
							size="mini"
							textAlign='left'
							style={{height: "150px",width: "15%", marginBottom: "25px", marginLeft: "22%", position: "relative"}}
						>
							
							{this.props.teamData.players.map((player, index) => (
								<Grid.Row style={{marginBottom: "20px"}}>
									<PlayerLabel
										color={"orange"}
										player={player}
										key={index}
										onMouseMove={(e) => {this.setState({mouse:{mouseX: e.screenX, mouseY: e.screenY}})}}
										onMouseEnter={(player, e) => {this.setState({renderPlayer: true, playerInfo: player, mouse: {mouseX: e.screenX, mouseY: e.screenY}})}}
										onMouseLeave={() => this.setState({renderPlayer:false})}
									/>
								</Grid.Row>
							))}
						</Segment>
					</Grid>
			 );
		} return (
			<Grid style={{position: "relative", zIndex:0}}>
				{this.state.renderPlayer ? <PlayerCard player={this.state.playerInfo} isOrange={false} mouseInfo={this.state.mouse}/> : null}
				<Segment
					onMouseLeave={() => this.props.mouseLeave()}
					size="mini"
					textAlign='left'
					style={{height: "150px",width: "15%", marginBottom: "25px", marginLeft: "65%", position: "relative"}}
				>
					{this.props.teamData.players.map((player, index) => (
						<Grid.Row style={{marginBottom: "20px"}}>
							<PlayerLabel
								color={"blue"}
								player={player}
								key={index}
								onMouseMove={(e) => {this.setState({mouse:{mouseX: e.screenX, mouseY: e.screenY}})}}
								onMouseEnter={(player, e) => {this.setState({renderPlayer: true, playerInfo: player, mouse: {mouseX: e.screenX, mouseY: e.screenY}})}}
								onMouseLeave={() => this.setState({renderPlayer:false})}
							/>
						</Grid.Row>
					))}
				</Segment>
			</Grid>
		 );
	}
}

export default TeamBox;