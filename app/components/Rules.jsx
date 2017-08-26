import React, {Component} from 'react';

class Rules extends Component {
    constructor(props) {
		super(props);
    }
	render() {
        return (
            <div className="card-row">
				<div className="card">
                    <div className="card-title">
                        Survivor Pool Rules
                    </div>
                    <div className="rules-content">
                        <div>
                            <b>In a Nutshell</b>
                            <p>Create team(s) to pick one NFL team per week to win in their respective matchup. If they win, your team moves on to the next week. If they lose, your team is eliminated. You may only select an NFL team once throughout the season. The picks are not made against the spread and ties are counted as losses. Winner takes all.</p>
                        </div>
                        <div>
                            <b>Gritty Details</b>
                            <ul>
                                <li>Each user can have multiple teams (user-teams), provided they pay the entry fee for each one of them.</li>
                                <li>One pick per user-team is required each week. If one of your user-teams does not have a selection that week, it is counted as a loss and that user-team is eliminated.</li>
                                <li>Surviving is user-team specific, so if you have "Team A" and "Team B" and "Team B's" selection loses, "Team A" is still active if their selection wins and vice-versa.</li>
                                <li>Similar to the above, NFL team selections are user-team specific as well. So if "Team A" takes the Giants in week 1, "Team B" is allowed to take the Giants any week of the season.</li>
                                <li>All picks must be made before that particular NFL game has started.</li>
                                <li>You cannot edit your pick if your current selection's NFL game has started.</li> 
                            </ul>
                        </div>
                    </div>
                </div>
		    </div>
        )
    }
};

export default Rules;