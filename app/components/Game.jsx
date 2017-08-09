import React, {Component} from 'react';
import * as Redux from 'react-redux';

class Game extends Component {
    constructor(props) {
		super(props);
    }
	render() {
		let kickoffDate = this.props.gameDate.substring(4,6) + "/" + this.props.gameDate.substring(6,8) + "/" + this.props.gameDate.substring(0,4); 
		let gameID = this.props.gameID;
		let quarter = this.props.quarter;
		let awayImage = `/images/${this.props.awayTeamName.toLowerCase()}.gif`;
		let homeImage = `/images/${this.props.homeTeamName.toLowerCase()}.gif`;

		switch(quarter) {
			case "P":
				quarter = "Pregame";
				break;
			case "H":
				quarter = "Half-Time";
				break;
			case "F":
				quarter = "Final";
				break;
			case "FO":
				quarter = "Final / Overtime";
			default:
				quarter = 'Q' + quarter;
		}
		
		return (
            <div className="pick-card-row">
				<div className="pick-card">
					<div className="pick-card-title">
						<img src={awayImage} height="50" width="50"/>
						<span className="vs-span">AT</span>
						<img src={homeImage} height="50" width="50"/>
					</div>
					<div className="pick-card-content">
						<div className="pick-card-kickoff">
                            <div className="pick-card-info-title">Kickoff:</div>
							{kickoffDate} at {this.props.time}
						</div>
                        <div className="pick-card-score">
                            <div className="pick-card-info-title">Current Score:</div>
                            {this.props.awayScore} - {this.props.homeScore} | {quarter}
                        </div>
					</div>
				</div>
			</div>
        )
    }
};

export default Redux.connect()(Game);