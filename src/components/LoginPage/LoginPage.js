import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Box, Button, Card, createStyles, Divider, Grid, TextField, Typography, withStyles } from '@material-ui/core';
import { userActions } from '../../_actions';
import { Lock, Person, } from '@material-ui/icons';

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
			<React.Fragment>
					<Grid
						container
						spacing={0}
						direction="column"
						alignItems="center"
						justify="center"
						style={{ minHeight: '40vw' }}
					>
						<br />
						<Typography variant="h1" style={{ textAlign: 'center' }} color='primary'>Log in</Typography>
						<br />
						<Divider></Divider>
						<br />
						<form name="form" >
							<div className="input-group form-group">
								<Person color="primary" />
								<TextField style={{ height: '40px', width: '380px' }} type="text" className="form-control" name="username" placeholder="username" value={username} onChange={this.handleChange} />
							</div>
							{submitted && !username &&
								<div style={{ color: 'red', }} className="help-block">Username is required</div>
							}
							<br />
							<div className="input-group form-group">
								<Lock color="primary" />
								<TextField style={{ height: '40px', width: '380px' }} type="password" className="form-control" name="password" placeholder="password" value={password} onChange={this.handleChange} />
							</div>
							{submitted && !password &&
								<div style={{ color: 'red', }} className="help-block">Password is required</div>
							}
							<br />
							{/* <div style={{ height: '40px', width: '380px', marginLeft: '230px'	 }} className="form-group"> */}


							{/* </div> */}
						</form>
						<div>
							{loggingIn &&
								<img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
							}
							<Button style={{ height: '40px', width: '160px', marginLeft: '30px' }} color="primary" variant="contained" onClick={this.handleSubmit}>Login</Button>
						</div>
						<Divider></Divider>
						<br /><br />
						<div className="card-footer">
							<div className="d-flex justify-content-center links">
								Don't have an account?<a href="/register"> Sign Up</a>
							</div>
							<div className="d-flex justify-content-center">
								<a href="#">Forgot your password?</a>
							</div>
						</div>
						<br />
					</Grid>
			</React.Fragment>
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

const connectedLoginPage = connect(mapState,
	{
		login: userActions.login,
		logout: userActions.logout
	})(LoginPage);
export { connectedLoginPage as LoginPage };