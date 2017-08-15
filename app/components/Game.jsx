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
		let progressText = '';
		let progress = null;
		let border = '';

		if(this.props.started && quarter !== 'F') {
			progress = <StartedText quarter={quarter}/>
			border = '2px solid #AA3939;';
		} else if(quarter == 'F') {
			progress = <FinalText />
			border = '2px solid #AA3939;';
		} else if(quarter == 'P') {
			progress = '';
		} 

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
				<div className="pick-card" style={{border: border}}>
					<div className="pick-card-title">
						<div className="logo-container">
							<img src={awayImage} height="70" width="70"/>
							<span className="vs-span">AT</span>
							<img src={homeImage} height="70" width="70"/>
						</div>
						<div className="score-container">
                            {this.props.awayScore} - {this.props.homeScore}
                        </div>
					</div>
					<div className="pick-card-content">
						<div className="pick-card-kickoff">
                            <div className="pick-card-info-title">Kickoff:</div>
							<div>{kickoffDate} at {this.props.time}</div>
							{progress}
						</div>
					</div>
				</div>
			</div>
		)
    }
};

function StartedText(props) {
    return (
        <div className="game-started">
			Started | {this.props.quarter}
		</div>
    )
}

function FinalText(props) {
    return (
        <div className="game-final">
			Finished
		</div>
    )
}

function PreText(props) {
	return (
		<div className="game-pre">
			Pregame
		</div>
	)
}

export default Redux.connect()(Game);