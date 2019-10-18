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
					onMouseEnter={() => this.props.onMouseEnter(this.props.player)}
				>
					{this.props.player.name}
				</Label>
			 );
		}
	}
}
export default PlayerLabel;