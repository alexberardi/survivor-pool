import React, {Component} from 'react';
import * as Redux from 'react-redux';
import firebase from 'firebase';
import axios from 'axios';
import {Link, IndexLink} from 'react-router';

import PieChartBuilder from 'PieChartBuilder';
import BarChartBuilder from 'BarChartBuilder';

class StandingsInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {lastWeekPopular : null, totalStreaks: null, activeStreaks: null, popularTeams: null};
    }
    componentWillMount() {
        const that = this; 
        const week = this.props.week > 0 ? this.props.week - 1 : 1;

        firebase.auth().currentUser.getToken(true).then(function(token) {
            axios.defaults.headers.common['Authorization'] = token;

            const lastWeekPicks = axios.get(`/popular/picks/${week}`).then((picks) => {
                return picks.data[0];
            }); 

            const teamCount = axios.get('/streaks/all').then((streaks) => {
                return streaks.data;
            });

            const activeCount = axios.get('/streaks/active').then((streaks) => {
                return streaks.data;
            });

            const popularTeams = axios.get('/popular/teams/all').then((teams) => {
                return teams.data[0];
            });

            Promise.all([lastWeekPicks, teamCount, activeCount, popularTeams])
                .then((values) => 
                that.setState({
                    lastWeekPopular: values[0],
                    totalStreaks: values[1],
                    activeStreaks: values[2],
                    popularTeams: values[3]
                })
            )
            .catch((error) => console.log(error));
        });
    }
	render() {
        let alive;
        let popularTeams;
        let lastWeek;

        if(this.state.lastWeekPopular !== null) {
            let picks;
            picks = this.state.lastWeekPopular.map((pick) => {
                return {
                    name: pick.team_name,
                    value: parseInt(pick.count)
                }
            });
            lastWeek = <div><PieChartBuilder data={picks} type={'Teams'} /></div>
        } else {
            lastWeek = <div>Loading..</div>
        }

        if(this.state.activeStreaks !== null) {
            let streaks = [];
            streaks.push({name: 'Active', value: this.state.activeStreaks, color: "#00AD61"}, {name: 'Elminated', value: this.state.totalStreaks - this.state.activeStreaks, color: "#AA3939"});
            alive = <div><PieChartBuilder data={streaks} type={'Users'} /></div>
        } else {
            alive = <div>Loading..</div>
        }

        if(this.state.popularTeams !== null) {
            popularTeams = <div><BarChartBuilder data={this.state.popularTeams} /></div>
        } else {
            popularTeams = <div>Loading..</div>
        }

        return (
            <div className="card-row">
				<div className="card">
					<div className="card-container">
                        <div className="card-title">
                            Standings <Link className="link" to={'standings'}>View</Link>
                        </div>
                        <div className="charts-container">
                            <div className="chart">
                                <div className="charts-title">Last Week's Picks</div>
                                {lastWeek}
                            </div>
                            <div className="chart">
                                <div className="charts-title">Player Teams</div>
                                {alive}
                            </div>
                            <div className="bar-chart">
                                <div className="charts-title">Popular Teams Across The Season</div>
                                {popularTeams}
                            </div>
                        </div>
                    </div>
				</div>
			</div>
        )
    }
};


export default Redux.connect()(StandingsInfo);