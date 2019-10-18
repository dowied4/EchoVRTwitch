import React, { Component } from 'react';
import { Segment, Label, Grid } from 'semantic-ui-react';
import PlayerLabel from './PlayerLabel';

class TeamBox extends Component {
	constructor(props) {
		super(props);
		this.state = {  }
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
					<Grid>
						<Segment
							onMouseEnter={() => {console.log("hovering")}}
							onMouseLeave={() => this.props.mouseLeave()}
							size="mini"
							textAlign='left'
							style={{height: "150px",width: "15%", marginBottom: "25px", marginLeft: "22%"}}
						>
							{this.props.teamData.players.map((player, index) => (
								<Grid.Row style={{marginBottom: "20px"}}>
									<PlayerLabel
										color={"orange"}
										player={player}
										key={index}
										onMouseEnter={(e) => {console.log(e)}}//This is where we render player card, e, being the player object
									/>
								</Grid.Row>
							))}
						</Segment>
					</Grid>
			 );
		} return (
			<Grid>
				<Segment
					onMouseLeave={() => this.props.mouseLeave()}
					size="mini"
					textAlign='left'
					style={{height: "150px",width: "15%", marginBottom: "25px", marginLeft: "65%"}}
				>
					{this.props.teamData.players.map((player, index) => (
						<Grid.Row style={{marginBottom: "20px"}}>
							<PlayerLabel
								color={"blue"}
								player={player}
								key={index}
								onMouseEnter={(e) => {console.log(e)}}//This is where we render player card, e, being the player object
							/>
						</Grid.Row>
					))}
				</Segment>
			</Grid>
		 );
	}
}

export default TeamBox;