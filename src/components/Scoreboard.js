import React, { Component } from 'react';
import { Card, Button, Grid, GridColumn } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import './scoreboard.css'
class Scoreboard extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			matchData: null,
			blueTeam: null,
			orangeTeam: null,
			loaded: false
	 }
	 this.configureStats = this.configureStats.bind(this);
	}

	componentDidMount(){
		if (this.props.matchData){
			this.setState({
				matchData: this.props.matchData,
			}, () => this.configureStats())
		}
	}

	configureStats(){
		let blue, orange;
		if (this.state.matchData.teams[0].team === "BLUE TEAM") {
			blue = this.state.matchData.teams[0]
			orange = this.state.matchData.teams[1]
		} else {
			blue = this.state.matchData.teams[1]
			orange = this.state.matchData.teams[0]
		}
		blue.clockTime = new Date(blue.stats.possession_time * 1000).toISOString().substr(14, 5);
		orange.clockTime = new Date(orange.stats.possession_time * 1000).toISOString().substr(14, 5)
		this.setState({
			blueTeam: blue,
			orangeTeam: orange,
			loaded: true
		})

	}

	render() {
	if (this.state.loaded)	{
		return (
				<div style={{margin: "0 auto", marginBottom: "25px", width: 600}}>
					<center style={{marginBottom: 20}}><h1 style={{fontWeight: "bolder"}}>TEAM STATS</h1></center>
					<Grid textAlign="center" columns="equal">
						<Grid.Row columns={3}>
							<Grid.Column className="orange-team-scoreboard"><b>{this.state.orangeTeam.team}</b></Grid.Column>
							<GridColumn width={1} className="spacer"></GridColumn>
							<Grid.Column className="blue-team-scoreboard"><b>{this.state.blueTeam.team}</b></Grid.Column>
						</Grid.Row>
						<Grid.Row columns={5} className="gradient-orange">
							<Grid.Column>
							{Math.round((this.state.orangeTeam.stats.possession_time/(this.state.orangeTeam.stats.possession_time + this.state.blueTeam.stats.possession_time)*100)).toFixed(0)}%</Grid.Column>
							<Grid.Column >{this.state.orangeTeam.clockTime}</Grid.Column>
							<Grid.Column width={3}><b className="header-bold">POSSESSION</b></Grid.Column>
							<Grid.Column>{this.state.blueTeam.clockTime}</Grid.Column>
							<Grid.Column>{Math.round((this.state.blueTeam.stats.possession_time/(this.state.orangeTeam.stats.possession_time + this.state.blueTeam.stats.possession_time))*100).toFixed(0)}%</Grid.Column>
						</Grid.Row>
						<Grid.Row columns={5} className="gradient-orange" >
							<Grid.Column>{Math.round((this.state.orangeTeam.stats.shots_taken/(this.state.orangeTeam.stats.shots_taken + this.state.blueTeam.stats.shots_taken)*100)).toFixed(0)}%</Grid.Column>
							<Grid.Column >{this.state.orangeTeam.stats.shots_taken}</Grid.Column>
							<Grid.Column width={3}><b className="header-bold">SHOTS</b></Grid.Column>
							<Grid.Column>{this.state.blueTeam.stats.shots_taken}</Grid.Column>
							<Grid.Column>{Math.round((this.state.blueTeam.stats.shots_taken/(this.state.orangeTeam.stats.shots_taken + this.state.blueTeam.stats.shots_taken)*100)).toFixed(0)}%</Grid.Column>
						</Grid.Row>
						<Grid.Row columns={5} className="gradient-orange">
							<Grid.Column>{Math.round((this.state.orangeTeam.stats.assists/(this.state.orangeTeam.stats.assists + this.state.blueTeam.stats.assists)*100)).toFixed(0)}%</Grid.Column>
							<Grid.Column >{this.state.orangeTeam.stats.assists}</Grid.Column>
							<Grid.Column width={3}><b className="header-bold">ASSISTS</b></Grid.Column>
							<Grid.Column>{this.state.blueTeam.stats.assists}</Grid.Column>
							<Grid.Column>{Math.round((this.state.blueTeam.stats.assists/(this.state.orangeTeam.stats.assists + this.state.blueTeam.stats.assists)*100)).toFixed(0)}%</Grid.Column>
						</Grid.Row>
						<Grid.Row columns={5} className="gradient-orange">
							<Grid.Column>{Math.round((this.state.orangeTeam.stats.saves/(this.state.orangeTeam.stats.saves + this.state.blueTeam.stats.saves)*100)).toFixed(0)}%</Grid.Column>
							<Grid.Column >{this.state.orangeTeam.stats.saves}</Grid.Column>
							<Grid.Column width={3}><b className="header-bold">SAVES</b></Grid.Column>
							<Grid.Column>{this.state.blueTeam.stats.saves}</Grid.Column>
							<Grid.Column>{Math.round((this.state.blueTeam.stats.saves/(this.state.orangeTeam.stats.saves + this.state.blueTeam.stats.saves)*100)).toFixed(0)}%</Grid.Column>
						</Grid.Row>
						<Grid.Row columns={5} className="gradient-orange">
							<Grid.Column>{Math.round((this.state.orangeTeam.stats.steals/(this.state.orangeTeam.stats.steals + this.state.blueTeam.stats.steals)*100)).toFixed(0)}%</Grid.Column>
							<Grid.Column >{this.state.orangeTeam.stats.steals}</Grid.Column>
							<Grid.Column width={3}><b className="header-bold">STEALS</b></Grid.Column>
							<Grid.Column>{this.state.blueTeam.stats.steals}</Grid.Column>
							<Grid.Column>{Math.round((this.state.blueTeam.stats.steals/(this.state.orangeTeam.stats.steals + this.state.blueTeam.stats.steals)*100)).toFixed(0)}%</Grid.Column>
						</Grid.Row>
						<Grid.Row columns={5} className="gradient-orange">
							<Grid.Column>{Math.round((this.state.orangeTeam.stats.steals/(this.state.orangeTeam.stats.stuns + this.state.blueTeam.stats.stuns)*100)).toFixed(0)}%</Grid.Column>
							<Grid.Column >{this.state.orangeTeam.stats.stuns}</Grid.Column>
							<Grid.Column width={3}><b className="header-bold">STUNS</b></Grid.Column>
							<Grid.Column>{this.state.blueTeam.stats.stuns}</Grid.Column>
							<Grid.Column>{Math.round((this.state.blueTeam.stats.stuns/(this.state.orangeTeam.stats.stuns + this.state.blueTeam.stats.stuns)*100)).toFixed(0)}%</Grid.Column>
						</Grid.Row>
					</Grid>
				</div>
			);
		} else {
			return null; //loading 
		}
	}
}
 
export default Scoreboard;