import React, {Component} from 'react';
import * as Redux from 'react-redux';
import {Link, IndexLink} from 'react-router';

class StandingsInfo extends Component {
    constructor(props) {
        super(props);
    }
	render() {
        return (
            <div className="card-row">
				<div className="card">
					<div className="card-container">
                        <div className="card-title">
                            Standings Info
                            <Link to={'standings'}>View Standings</Link>
                        </div>
                        <div className="card-content">
                        </div>
                    </div>
				</div>
			</div>
        )
    }
};


export default Redux.connect()(StandingsInfo);