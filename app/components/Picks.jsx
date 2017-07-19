import React, {Component} from 'react';
import * as Redux from 'react-redux';

import Nav from 'Nav';
import Game from 'Game';
import Footer from 'Footer';

class Picks extends Component {
	constructor(props) {
		super(props);
    }
	componentDidMount() {
		/*
		get game info for the week
		games.map((game) => {
				return (
					<Game id={game.id} {...game}/>
				)
			});
		*/
	}
	render() {
		return (
			<div className="dashboard">
				<Nav page={'Picks'} />
				<div className="row">
					<div className="column small-centered small-11 medium-10 large-9">
						<div className="dashboard-title">Picks</div>
						<div className="container">
							<Game />
						</div>
					</div>
				</div>
				<div className="row">
					<Footer />
				</div>
			</div>
		)
	}
};

export default Redux.connect()(Picks);