import React, {Component} from 'react';
import * as Redux from 'react-redux';

class Game extends Component {
    constructor(props) {
		super(props);
    }
	render() {
        return (
            <div className="pick-card-row">
				<div className="pick-card">
					<div className="pick-card-title">
						<img src="/images/49ers.gif" height="50" width="50"/>
						<span className="vs-span">AT</span>
						<img src="/images/bears.gif" height="50" width="50"/>
					</div>
					<div className="pick-card-content">
						<div className="pick-card-kickoff">
                            <div className="pick-card-info-title">Kickoff:</div>
							Monday 9.11.17 4PM
						</div>
                        <div className="pick-card-score">
                            <div className="pick-card-info-title">Current Score:</div>
                            11 - 7 3rd Quarter 
                        </div>
					</div>
				</div>
			</div>
        )
    }
};

export default Redux.connect()(Game);