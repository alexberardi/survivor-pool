import React, {Component} from 'react';

class Footer extends Component {
    constructor(props) {
		super(props);
    }
	render() {
        return (
            <div className="footer">
				<p>Survivor Pool is not affiliated with The National Football League (NFL).</p> 
				<p>The team names, logos and uniform designs are registered trademarks of the teams indicated. All other NFL-related trademarks are trademarks of the National Football League.</p>
		    </div>
        )
    }
};

export default Footer;