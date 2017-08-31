import React, {Component} from 'react';
import * as Redux from 'react-redux';
import * as Requests from 'Requests';


class UserTeamSearch extends Component {
    constructor(props) {
        super(props);
    }
	render() {
		return (
            <div className="search-container">
                <input type="text" ref="searchText" className="search" placeholder="Search Players" onChange={() => {
						var searchText = this.refs.searchText.value;
						this.props.handleSearch(searchText);
				}}/>    
            </div>
        )
    }
};

export default Redux.connect()(UserTeamSearch);