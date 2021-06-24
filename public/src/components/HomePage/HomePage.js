import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Box, Button, Card, createStyles, Divider, Grid, TextField, Typography, withStyles } from '@material-ui/core';
import { userActions } from '../../_actions';
import { Lock, Person, } from '@material-ui/icons';

class HomePage extends React.Component {
    
}

function mapState(state) {
	const { loggingIn } = state.authentication;
	return { loggingIn };
}

const actionCreators = {
	login: userActions.login,
	logout: userActions.logout
};

const connectedHomePage = connect(mapState,
	{
		login: userActions.login,
		logout: userActions.logout
	})(HomePage);
export { connectedHomePage as HomePage };