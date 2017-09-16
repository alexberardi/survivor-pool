import React, {Component} from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';
import * as Requests from 'Requests';

class FeatureRequest extends Component {
	constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        const that = this;

        if(this.state.value !== '') {
            Requests.post('/features', {message: this.state.value})
            .then((respose) => {
                that.setState({value: 'Submitted!'});
            });
        }
    }
    handleChange(e) {
        this.setState({value: e.target.value});
    }
	render() {
		return (
            <div>
                Got an idea for a new feature?
                <form onSubmit={this.handleSubmit}>
                    <textarea className="textarea" placeholder='Write something good' value={this.state.value} onChange={this.handleChange}/>
                    <button type="submit" className="secondary-button-solo">Send</button>
                </form>
            </div>
		)
	}
};

export default Redux.connect()(FeatureRequest);