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
					color={this.props.color}
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