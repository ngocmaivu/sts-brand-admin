import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import { userActions } from '../../_actions';
import './login.css';
import { Facebook, GridOnOutlined, Keyboard, Lock, Person, Twitter } from '@material-ui/icons';

// const styleDivCard = {
//     height: '370px',
//     marginTop: 'auto',
//     marginBottom: 'auto',
//     width: '400px',
//     backgroundColor: 'rgba(0,0,0,0.5) !important',
// };
// const h2Style = {
//     textAlign: 'center',
// };
// const containerStyle = {
//     backgroundImage: `url('http://getwallpapers.com/wallpaper/full/a/5/d/544750.jpg')`,
//     backgroundSize: 'cover',
//     backgroundRepeat: 'no-repeat',
//     height: '100%',
//     weigh: '800px',
//     alignContent: 'center',
//     fontFamily: 'Numans',
// };
class LoginPage extends React.Component {
	constructor(props) {
		super(props);

		// reset login status
		this.props.logout();

		this.state = {
			username: '',
			password: '',
			submitted: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	handleSubmit(e) {
		e.preventDefault();

		this.setState({ submitted: true });
		const { username, password } = this.state;
		if (username && password) {
			this.props.login(username, password);
		}
	}

	render() {
		const { loggingIn } = this.props;
		const { username, password, submitted } = this.state;
		return (
			<div className="container">
				<div className="d-flex justify-content-center h-100">
					<div className="card">
						<div className="card-header">
							<h3>Sign in</h3>
							{/* <div className="d-flex justify-content-end social_icon">
								<span><Facebook /></span>
								<span><Twitter></Twitter></span>
							</div> */}
						</div>
						<div className="card-body">
							<form name="form" onSubmit={this.handleSubmit}>
								<div className="input-group form-group">
									<div className="input-group-prepend">
										<span className="input-group-text"><Person /></span>
									</div>
									<input style={{height: '40px',}} type="text" className="form-control" name="username" placeholder="username" value={username} onChange={this.handleChange} />
								</div>
								{submitted && !username &&
									<div className="help-block">Username is required</div>
								}
								<div className="input-group form-group">
									<div className="input-group-prepend">
										<span className="input-group-text"><Lock /></span> 
									</div>
									<input style={{height: '40px',}} type="password" className="form-control" name="password" placeholder="password" value={password} onChange={this.handleChange} />
								</div>
								{submitted && !password &&
									<div className="help-block">Password is required</div>
								}
								{/* <div className="row align-items-center remember"> */}
								{/* <input type="checkbox" />Remember Me</div> */}
								<div className="form-group">
									<button className="login_btn">Login</button>
									{loggingIn}
								</div>
							</form>
						</div>
						<div className="card-footer">
							<div className="d-flex justify-content-center links">
								Don't have an account?<a href="/register">Sign Up</a>
							</div>
							<div className="d-flex justify-content-center">
								<a href="#">Forgot your password?</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapState(state) {
	const { loggingIn } = state.authentication;
	return { loggingIn };
}

const actionCreators = {
	login: userActions.login,
	logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };