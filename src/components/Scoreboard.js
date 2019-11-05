import React, { Component } from 'react';
import { Progress, Card, Button, Grid, GridColumn } from 'semantic-ui-react';
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
		let sizes = {
			orangePos: Math.round((this.state.orangeTeam.stats.possession_time/(this.state.orangeTeam.stats.possession_time + this.state.blueTeam.stats.possession_time)*100)).toFixed(0)+'%',
			bluePos: Math.round((this.state.blueTeam.stats.possession_time/(this.state.orangeTeam.stats.possession_time + this.state.blueTeam.stats.possession_time))*100).toFixed(0)+'%',
			orangeShots: Math.round((this.state.orangeTeam.stats.shots_taken/(this.state.orangeTeam.stats.shots_taken + this.state.blueTeam.stats.shots_taken)*100)).toFixed(0)+'%',
			blueShots: Math.round((this.state.blueTeam.stats.shots_taken/(this.state.orangeTeam.stats.shots_taken + this.state.blueTeam.stats.shots_taken)*100)).toFixed(0)+'%',
			orangeAssists:Math.round((this.state.orangeTeam.stats.assists/(this.state.orangeTeam.stats.assists + this.state.blueTeam.stats.assists)*100)).toFixed(0)+'%',
			blueAssists:Math.round((this.state.blueTeam.stats.assists/(this.state.blueTeam.stats.assists + this.state.orangeTeam.stats.assists)*100)).toFixed(0)+'%',
			orangeSaves:Math.round((this.state.orangeTeam.stats.saves/(this.state.orangeTeam.stats.saves + this.state.blueTeam.stats.saves)*100)).toFixed(0)+'%',
			blueSaves:Math.round((this.state.blueTeam.stats.saves/(this.state.orangeTeam.stats.saves + this.state.blueTeam.stats.saves)*100)).toFixed(0)+'%',
			orangeSteals:Math.round((this.state.orangeTeam.stats.steals/(this.state.orangeTeam.stats.steals + this.state.blueTeam.stats.steals)*100)).toFixed(0)+'%',
			blueSteals:Math.round((this.state.blueTeam.stats.steals/(this.state.orangeTeam.stats.steals + this.state.blueTeam.stats.steals)*100)).toFixed(0)+'%',
			orangeStuns:Math.round((this.state.orangeTeam.stats.stuns/(this.state.orangeTeam.stats.stuns + this.state.blueTeam.stats.stuns)*100)).toFixed(0)+'%',
			blueStuns:Math.round((this.state.blueTeam.stats.stuns/(this.state.orangeTeam.stats.stuns + this.state.blueTeam.stats.stuns)*100)).toFixed(0)+'%'
		}
		return (
				<div style={{display: "inline-block", width: 700, marginBottom: 30}}>
					<center style={{marginBottom: 20}}><h1 style={{color: "white"}}>TEAM STATS</h1></center>
					<Grid textAlign="center" columns="equal" className="baseScoreboard">
						<Grid.Row columns={3}>
							<Grid.Column className="orange-team-scoreboard"><b>{this.state.orangeTeam.team}</b></Grid.Column>
							<GridColumn width={1} className="spacer"></GridColumn>
							<Grid.Column className="blue-team-scoreboard"><b>{this.state.blueTeam.team}</b></Grid.Column>
						</Grid.Row>
						<Grid.Row columns={5} className="gradient-orange" >
							<Grid.Column>{sizes.orangePos}</Grid.Column>
							<Grid.Column >{this.state.orangeTeam.clockTime}</Grid.Column>
							<Grid.Column width={3}><b className="header-bold">POSSESSION</b></Grid.Column>
							<Grid.Column>{this.state.blueTeam.clockTime}</Grid.Column>
							<Grid.Column>{sizes.bluePos}</Grid.Column>
							<Grid.Row columns='equal' className="ui grid noMargin">
								<Grid.Column className="barBackground">
									<Grid.Column className="bar orange" style={{width:sizes.orangePos}}></Grid.Column>
								</Grid.Column>
								<Grid.Column className="barBackground">
									<Grid.Column className="bar blue" style={{width:sizes.bluePos}}></Grid.Column>
								</Grid.Column>
							</Grid.Row>
						</Grid.Row>

						<Grid.Row columns={5} className="gradient-orange" >
							<Grid.Column>{sizes.orangeShots}</Grid.Column>
							<Grid.Column >{this.state.orangeTeam.stats.shots_taken}</Grid.Column>
							<Grid.Column width={3}><b className="header-bold">SHOTS</b></Grid.Column>
							<Grid.Column>{this.state.blueTeam.stats.shots_taken}</Grid.Column>
							<Grid.Column>{sizes.blueShots}</Grid.Column>
							<Grid.Row columns='equal' className="ui grid noMargin">
								<Grid.Column className="barBackground">
									<Grid.Column className="bar orange" style={{width:sizes.orangeShots}}></Grid.Column>
								</Grid.Column>
								<Grid.Column className="barBackground">
									<Grid.Column className="bar blue" style={{width:sizes.blueShots}}></Grid.Column>
								</Grid.Column>
							</Grid.Row>
						</Grid.Row>
						<Grid.Row columns={5} className="gradient-orange">
							<Grid.Column>{sizes.orangeAssists}</Grid.Column>
							<Grid.Column >{this.state.orangeTeam.stats.assists}</Grid.Column>
							<Grid.Column width={3}><b className="header-bold">ASSISTS</b></Grid.Column>
							<Grid.Column>{this.state.blueTeam.stats.assists}</Grid.Column>
							<Grid.Column>{sizes.blueAssists}</Grid.Column>
							<Grid.Row columns='equal' className="ui grid noMargin">
								<Grid.Column className="barBackground">
									<Grid.Column className="bar orange" style={{width:sizes.orangeAssists}}></Grid.Column>
								</Grid.Column>
								<Grid.Column className="barBackground">
									<Grid.Column className="bar blue" style={{width:sizes.blueAssists}}></Grid.Column>
								</Grid.Column>
							</Grid.Row>
						</Grid.Row>
						<Grid.Row columns={5} className="gradient-orange">
							<Grid.Column>{sizes.orangeSaves}</Grid.Column>
							<Grid.Column >{this.state.orangeTeam.stats.saves}</Grid.Column>
							<Grid.Column width={3}><b className="header-bold">SAVES</b></Grid.Column>
							<Grid.Column>{this.state.blueTeam.stats.saves}</Grid.Column>
							<Grid.Column>{sizes.blueSaves}</Grid.Column>
							<Grid.Row columns='equal' className="ui grid noMargin">
								<Grid.Column className="barBackground">
									<Grid.Column className="bar orange" style={{width:sizes.orangeSaves}}></Grid.Column>
								</Grid.Column>
								<Grid.Column className="barBackground">
									<Grid.Column className="bar blue" style={{width:sizes.blueSaves}}></Grid.Column>
								</Grid.Column>
							</Grid.Row>
						</Grid.Row>
						<Grid.Row columns={5} className="gradient-orange">
							<Grid.Column>{sizes.orangeSteals}</Grid.Column>
							<Grid.Column >{this.state.orangeTeam.stats.steals}</Grid.Column>
							<Grid.Column width={3}><b className="header-bold">STEALS</b></Grid.Column>
							<Grid.Column>{this.state.blueTeam.stats.steals}</Grid.Column>
							<Grid.Column>{sizes.blueSteals}</Grid.Column>
							<Grid.Row columns='equal' className="ui grid noMargin">
								<Grid.Column className="barBackground">
									<Grid.Column className="bar orange" style={{width:sizes.orangeSteals}}></Grid.Column>
								</Grid.Column>
								<Grid.Column className="barBackground">
									<Grid.Column className="bar blue" style={{width:sizes.blueSteals}}></Grid.Column>
								</Grid.Column>
							</Grid.Row>
						</Grid.Row>
						<Grid.Row columns={5} className="gradient-orange">
							<Grid.Column>{sizes.orangeStuns}</Grid.Column>
							<Grid.Column >{this.state.orangeTeam.stats.stuns}</Grid.Column>
							<Grid.Column width={3}><b className="header-bold">STUNS</b></Grid.Column>
							<Grid.Column>{this.state.blueTeam.stats.stuns}</Grid.Column>
							<Grid.Column>{sizes.blueStuns}</Grid.Column>
							<Grid.Row columns='equal' className="ui grid noMargin">
								<Grid.Column className="barBackground">
									<Grid.Column className="bar orange" style={{width:sizes.orangeStuns}}></Grid.Column>
								</Grid.Column>
								<Grid.Column className="barBackground">
									<Grid.Column className="bar blue" style={{width:sizes.blueStuns}}></Grid.Column>
								</Grid.Column>
							</Grid.Row>
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