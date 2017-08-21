import React, {Component} from 'react';
import FaGithub from 'react-icons/lib/fa/github';

class Footer extends Component {
    constructor(props) {
		super(props);
    }
	render() {
        return (
            <div className="footer">
				<p>Survivor Pool is not affiliated with The National Football League (NFL).</p> 
				<p>The team names, logos and uniform designs are registered trademarks of the teams indicated. All other NFL-related trademarks are trademarks of the National Football League.</p>
                <a href="https://github.com/alexberardi/survivor-pool" target="_blank"><FaGithub size={30} style={{color: '#362C6A'}}/></a>
		    </div>
        )
    }
};

export default Footer;