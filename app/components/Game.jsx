import React, {Component} from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';
import * as Requests from 'Requests';

class Game extends Component {
    constructor(props) {
		super(props);
		this.state = {pick: null, picked: false, ...props};
		this.startPick = this.startPick.bind(this);
		this.submitPick = this.submitPick.bind(this);
		this.cancelPick = this.cancelPick.bind(this);
	}
	startPick(team) {
		if(this.props.currentPick == null) {
			let pick = {
				gameID: this.state.gameID,
				teamID: this.state.teamID,
				userID: this.state.userID,
				week: this.state.week,
				teamName: team
			}
			this.props.handlePick(pick);
			this.setState({picked: true, pick});
		}
	}
	submitPick(e) {
		e.preventDefault();
		let that = this;

        Requests.post(`/picks/${this.state.teamID}`, this.state.pick)
            .then(function(res) {
				that.setState({picked: false});
            })
            .catch(function(error) {
                console.log('Error picking game', error);
            });
	}
	cancelPick(e) {
		e.preventDefault();
		this.props.cancelPick();
		this.setState({picked: false, pick: null});
	}
	render() {
		let kickoffDate = this.state.gameDate.substring(4,6) + "/" + this.state.gameDate.substring(6,8) + "/" + this.state.gameDate.substring(0,4); 
		let gameID = this.state.gameID;
		let quarter = this.state.quarter;
		let awayImage = `/images/${this.state.awayTeamName.toLowerCase()}.gif`;
		let homeImage = `/images/${this.state.homeTeamName.toLowerCase()}.gif`;
		let progressText = '';
		let progress = null;
		let border = '';
		let pickConfirmation = null;

		if(this.state.started && quarter !== 'F') {
			progress = <StartedText quarter={quarter}/>
			border = '2px solid #AA3939';
		} else if(quarter == 'F') {
			progress = <FinalText />
			border = '2px solid #AA3939';
		} else if(quarter == 'P') {
			progress = <PreText />;
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

		if(this.state.picked) {
            pickConfirmation = 
			<div className="pick-confirmation">Are you sure you want to pick the {this.state.pick.teamName}? 
                    <div className="pick-confirmation-link">
                        <a href="#" className="pick-team-confirm" onClick={this.submitPick}>Yes</a>
                        <a href="#" className="pick-team-cancel" onClick={this.cancelPick}>No</a>
                    </div>
            </div>
		}

		return (
            <div className="pick-card-row">
				<div className="pick-card" style={{border: border}}>
					<div className="pick-card-title">
						<div className="logo-container">
							<img src={awayImage} height="70" width="70" onClick={() => this.startPick(this.state.awayTeamName)}/>
							<span className="vs-span">AT</span>
							<img src={homeImage} height="70" width="70" onClick={() => this.startPick(this.state.homeTeamName)}/>
						</div>
						<div className="score-container">
                            {this.state.awayScore} - {this.state.homeScore}
                        </div>
					</div>
					<div className="pick-card-content">
						<div className="pick-card-kickoff">
                            <div className="pick-card-info-title">Kickoff:</div>
							<div>{kickoffDate} at {this.state.time}</div>
							{progress}
						</div>
						<div className="pick-card-confirmation">
							{pickConfirmation}
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