import React, {Component} from 'react';
import * as Redux from 'react-redux';
import axios from 'axios';
import {Link, IndexLink} from 'react-router';

import PieChartBuilder from 'PieChartBuilder';

class StandingsInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {lastWeekPopular : null};
    }
    componentWillMount() {
        const that = this; 
        const week = this.props.week > 0 ? this.props.week - 1 : 1;

        axios.get(`/popular/${week}`).then((picks) => {
            that.setState({lastWeekPopular: picks.data[0]});
        }); 
    }
	render() {
        let picks;
        let lastWeek;
        if(this.state.lastWeekPopular !== null) {
            picks = this.state.lastWeekPopular.map((pick) => {
                return {
                    name: pick.team_name,
                    value: pick.count
                }
            });
            lastWeek = <div><PieChartBuilder data={picks} type={'Teams'} /></div>
        } else {
            lastWeek = <div>Loading..</div>
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
                        </div>
                    </div>
				</div>
			</div>
        )
    }
};


export default Redux.connect()(StandingsInfo);