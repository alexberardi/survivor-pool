import React, {Component} from 'react';
import * as Redux from 'react-redux';
import { PieChart, Pie, Sector, Cell, Tooltip} from 'recharts';

class PieChartBuilder extends Component {
    constructor(props) {
        super(props);
        this.PieChartFormatter = this.PieChartFormatter.bind(this);
    }
    PieChartFormatter(data, type) {
        function MapTeamColors(team) {
            const  teamColors = {
                Cardinals:  "#97233F",
                Falcons: "#A71930",	
                Ravens: "#241773",
                Bills: "#00338D",
                Panthers: "#0085CA",
                Bears: "#0B162A",
                Bengals: "#000000",
                Browns: "#FB4F14",
                Cowboys: "#002244",
                Broncos: "#002244",
                Lions: "#005A8B",
                Packers: "#203731",
                Texans: "#03202F",
                Colts: "#002C5F",
                Jaguars: "#9F792C",
                Chiefs: "#E31837",
                Rams: "#002244",
                Dolphins: "#008E97",
                Vikings: "#4F2683",
                Patriots: "#002244",
                Saints: "#9F8958",
                Giants: "#0B2265",
                Jets: "#203731",
                Raiders: "#A5ACAF",
                Eagles: "#004953",
                Steelers: "#FFB612",
                Chargers: "#002244",
                FortyNiners: "#AA0000",
                Seahawks: "#69BE28",
                Buccaneers: "#D50A0A",
                Titans: "#4B92DB",
                Redskins: "#773141"
            }
            if (team == '49ers') {
                return teamColors.FortyNiners
            } else {
                return teamColors[team]
            }
        }

        if(type == 'Teams') {
            data = data.map((entry, index) => {
                return {
                    ...entry,
                    color: MapTeamColors(entry.name)
                }
            });
        }

        return data;
    }
	render() {
        if(this.props.data !== null) {
            const data = this.PieChartFormatter(this.props.data, this.props.type);
            return  (
                <PieChart width={200} height={250}>
                    <Pie
                        data={data}
                        dataKey="value"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={5}
                    >
                    {
                        data.map((entry, index) => <Cell key={index} fill={entry.color} />)
                    }
                    </Pie>
                    <Tooltip />
                </PieChart>
            )
        } else { 

            return (
                <div>Loading..</div>
            )
        }
    }
};

export default Redux.connect()(PieChartBuilder);