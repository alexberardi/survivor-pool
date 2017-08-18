import React, {Component} from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';
import * as Requests from 'Requests';

class Game extends Component {
    constructor(props) {
		super(props);
		this.state = {...props};
		this.formatPick = this.formatPick.bind(this);
		this.startPick = this.startPick.bind(this);
		this.submitPick = this.submitPick.bind(this);
		this.cancelPick = this.cancelPick.bind(this);
		this.warnPick = this.warnPick.bind(this);
	}
	formatPick(teamName) {
		return {
			gameID: this.props.gameID,
			teamID: this.props.teamID,
			userID: this.props.userID,
			week: this.props.week,
			teamPicked: teamName
		}
	}
	startPick(pick) {
		if(!this.props.started && !this.props.disabled) {
			if(this.props.pick !== null && pick.teamPicked !== this.props.pick.teamName) {
				this.props.startPick(pick);
			} else if(this.props.pick === null){
				this.props.startPick(pick);
			}
		} else {
			this.warnPick();
		}
	}
	warnPick() {

	}
	submitPick(e) {
		if(!this.props.disabled) {
			e.preventDefault();
			this.props.submitPick();
		}
	}
	cancelPick(e) {
		e.preventDefault();
		this.props.cancelPick();
	}
	render() {
		let progress = null;
		let border = '';
		let homeBorder = '';
		let awayBorder = '';
		let pickConfirmation = null;
		let quarterText = this.props.quarterText.toString();

		if(this.props.picked && this.props.pick !== null) {
			if(this.props.pick.gameID == this.props.gameID) {
				if(this.props.pick.teamName === this.props.awayTeamName) {
					awayBorder = '3px solid #362C6A';
				} else if(this.props.pick.teamName === this.props.homeTeamName) {
					homeBorder = '3px solid #362C6A';
				}
				pickConfirmation = 
				<div className="pick-confirmation">
					You chose the {this.props.pick.teamName}
				</div>
			}
		}

		if(this.props.started && this.props.quarter !== 'F') {
			progress = <div className="game-started">
							Started | {quarterText}
						</div>
			border = '4px solid #AA3939';
		} else if(this.props.quarter == 'F') {
			progress =   <div className="game-final">
							{quarterText}
						</div>
			border = '4px solid #AA3939';
		} else if(this.props.quarter == 'P') {
			progress = 	<div className="game-pre">
							{quarterText}
						</div>
		} 

		if(this.props.pickStarted && this.props.pickedGame) {
            pickConfirmation = 
			<div className="pick-confirmation">Are you sure you want to pick the {this.props.pickTemp.teamPicked}? 
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
							<img src={this.props.awayImage} height="70" width="70" style={{border: awayBorder, borderRadius: '6px'}} onClick={() => this.startPick(this.formatPick(this.props.awayTeamName))}/>
							<span className="vs-span">AT</span>
							<img src={this.props.homeImage} height="70" width="70" style={{border: homeBorder, borderRadius: '6px'}} onClick={() => this.startPick(this.formatPick(this.props.homeTeamName))}/>
						</div>
						<div className="score-container">
                            {this.props.awayScore} - {this.props.homeScore}
                        </div>
					</div>
					<div className="pick-card-content">
						<div className="pick-card-kickoff">
                            <div className="pick-card-info-title">Kickoff:</div>
							<div>{this.props.kickoffDate} at {this.props.kickoffTime}</div>
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


export default Redux.connect()(Game);