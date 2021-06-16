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
		// const classes = useStyles();
		return (
			<Grid
				container
				spacing={0}
				direction="column"
				alignItems="center"
				justify="center"
				style={{ minHeight: '40vw' }}
			>

				<Grid item xs={3}>
					<Card style={{
						// display: '-ms-flexbox',
						width: '35vw',
						transitionDuration: '0.3s',
						height: '20vw'
					}}>
						<Grid item xs={12}>
							<Grid item xs={12} container alignItems="center" justifyContent="center">
								{/* <Box mb={2}> */}
								<Typography variant="subtitle1">
									Login
                        </Typography>
								{/* </Box> */}
							</Grid>
						</Grid>
						<Divider></Divider>
						<form name="form" onSubmit={this.handleSubmit}>
							<div className="input-group form-group">
								<div className="input-group-prepend">
									<span className="input-group-text"><Person /></span>
								</div>
								<input style={{ height: '40px', }} type="text" className="form-control" name="username" placeholder="username" value={username} onChange={this.handleChange} />
							</div>
							{submitted && !username &&
								<div style={{ color: 'red', }} className="help-block">Username is required</div>
							}
							<div className="input-group form-group">
								<Lock />
								<input style={{ height: '40px', }} type="password" className="form-control" name="password" placeholder="password" value={password} onChange={this.handleChange} />
							</div>
							{submitted && !password &&
								<div style={{ color: 'red', }} className="help-block">Password is required</div>
							}
							<div className="form-group">
								<button className="login_btn">Login</button>
								{loggingIn}
							</div>
						</form>
						<Divider></Divider>
						<div className="card-footer">
							<div className="d-flex justify-content-center links">
								Don't have an account?<a href="/register">Sign Up</a>
							</div>
							<div className="d-flex justify-content-center">
								<a href="#">Forgot your password?</a>
							</div>
						</div>
					</Card>
				</Grid>
			</Grid>
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