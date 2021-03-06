import React, { Component } from 'react';
import { Label } from 'semantic-ui-react'

class PlayerLabel extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		if(this.props.player){
			return (
				<Label
					style={{color: "white", fontWeight: "bold", background: this.props.color === "blue" ? "#204fe9" : "#e9a220"}}
					onMouseMove={(e) => this.props.onMouseMove(e)}
					onMouseEnter={(e) => this.props.onMouseEnter(this.props.player, e)}
					onMouseLeave={() => this.props.onMouseLeave()}
				>
					{this.props.player.name}
				</Label>
			 );
		}
	}
}
export default PlayerLabel;