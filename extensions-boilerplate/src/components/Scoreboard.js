import React, { Component } from 'react';
import { Segment, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
class Scoreboard extends Component {
	constructor(props) {
		super(props);
		this.state = {  }
	}
	render() { 
		return ( 
			<Segment size="mini" textAlign='center' style={{height: "400px",width: "30%", margin: "0 auto", marginBottom: "25px"}}>
				This is a big test for scoreboard
			</Segment>
		 );
	}
}
 
export default Scoreboard;