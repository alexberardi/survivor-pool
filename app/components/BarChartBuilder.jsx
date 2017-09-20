import React, {Component} from 'react';
import * as Redux from 'react-redux';
import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

class BarChartBuilder extends Component {
    constructor(props) {
        super(props);
    }
	render() {
        if(this.props.data !== null) {
            const data = this.props.data.map((entry) => {
                return {
                    team_name: entry.team_name,
                    Picks: parseInt(entry.count)
                }   
            });
        
            return  (
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={data}>
                        <XAxis dataKey="team_name"/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Bar dataKey="Picks" fill="#362C6A" />
                        <Tooltip />
                    </BarChart>
                </ResponsiveContainer>
            )
        } else { 
            return (
                <div>Loading..</div>
            )
        }
    }
};

export default Redux.connect()(BarChartBuilder);