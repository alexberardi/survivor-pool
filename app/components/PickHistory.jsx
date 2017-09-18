import React, {Component} from 'react';
import * as Redux from 'react-redux';
import * as Requests from 'Requests';

class PickHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teamID: props.teamID,
            userID: props.userID,
            pickHistory: null
        };
    }
    componentDidMount() {
        const that = this;

        Requests.get(`/picks/all/${this.state.userID}/${this.state.teamID}`).then((picks) => {
            if(picks.data !== null) {
                let pickHistory = picks.data.map((pick) => {
                    return pick.team_name.toLowerCase();
                });
                that.setState({pickHistory});
            }

        })
    }
	render() {
        const pickHistory = this.state.pickHistory;

        const renderTeamLogos = () => {
            const teams = [
                'cardinals',
                'falcons',
                'ravens',
                'bills',
                'panthers',
                'bears',
                'bengals',
                'browns',
                'cowboys',
                'broncos',
                'lions',
                'packers',
                'texans',
                'colts',
                'jaguars',
                'chiefs',
                'rams',
                'chargers',
                'dolphins',
                'vikings',
                'patriots',
                'saints',
                'giants',
                'jets',
                'raiders',
                'eagles',
                'steelers',
                '49ers',
                'seahawks',
                'buccaneers',
                'titans',
                'redskins'
            ];

            return teams.map((team, index) => {
                let imageURL = `/images/${team}.gif`;
                let picked = false;
                let style = null;

                if(pickHistory.includes(team)) {
                    picked = true;
                    style = 'picked-team';
                }

                return (
                    <img key={index} src={imageURL} className={style} height="40" width="40" style={{margin: '6px 6px 6px 6px', padding: '3px 3px 3px 3px'}}/>
                )
            });
        }

        if(this.state.pickHistory === null) {
            return (
                <div>
                    No History
                </div>
            )
        }      

		return (
            <div className="history-logos">
                {renderTeamLogos()}
            </div>
        )
    }
};

export default Redux.connect()(PickHistory);