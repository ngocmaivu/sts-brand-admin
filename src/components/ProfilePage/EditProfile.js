import { Card, Button, Container, FormControl, FormLabel, makeStyles, Grid, Paper, Tab, Tabs, TextField, Typography, withStyles } from "@material-ui/core"
import { Delete, Edit, PostAdd } from "@material-ui/icons";
import React from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from "@material-ui/data-grid";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { skillActions, userActions } from "../../_actions";

const useStyles = makeStyles((theme) => ({
    card: {
        padding: "30px 25px",
    },
    input: {
        fontSize: '1em'
    },
    form: {
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        width: 300
    },
    container: {

        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        padding: 20,

    },
}));


class EditProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: props.users.items.firstName,
                lastName: props.users.items.lastName,
                address: props.users.items.address,
                email: props.users.items.email,
                phone: props.users.items.phone,
                gender: props.users.items.gender,
            },
            submitted: false,
            value: 1,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    };
    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { users } = this.state;
        // if (users.name) {
        //     this.props.updateusers(users);
        // }
    }
    handleClick(event) {
        // event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        this.props.updateUser(user);
    }
    componentDidMount() {
        this.props.getByUserName();
    }


    render() {
        const { users, type } = this.props;
        console.log(users)
        if (!this.props.users.items) {
            return <p>...Loading</p>;
        }
        return (

            <React.Fragment>
                <Card style={{ padding: '10px', marginBottom: '20px' }}>
                    <h1>Edit Profile</h1>
                </Card>
                <Paper style={{ padding: '20px' }} elevation={0}>
                    <form>
                        <Grid container direction="column" spacing={1}>
                            <Grid container item spacing={3} >
                                <Grid item xs={6}>
                                    <FormControl margin="normal" fullWidth>
                                        <FormLabel >First name</FormLabel>
                                        <TextField name="firstName" size="small" variant="outlined" defaultValue={users.items.firstName} onChange={this.handleChange} />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl margin="normal" fullWidth>
                                        <FormLabel >Last name</FormLabel>
                                        <TextField name="lastName" size="small" variant="outlined" defaultValue={users.items.lastName} onChange={this.handleChange} />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container item spacing={3} >
                                <Grid item xs={6}>
                                    <FormControl margin="normal" fullWidth>
                                        <FormLabel >Your Address</FormLabel>
                                        <TextField name="address" size="small" variant="outlined" defaultValue={users.items.address} onChange={this.handleChange} />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl margin="normal" fullWidth>
                                        <FormLabel >Number Phone</FormLabel>
                                        <TextField name="phone" size="small" variant="outlined" defaultValue={users.items.phone} onChange={this.handleChange} />
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} >
                                <FormControl margin="normal" fullWidth>
                                    <FormLabel >Email Address</FormLabel>
                                    <TextField name="email" size="small" variant="outlined" defaultValue={users.items.email} onChange={this.handleChange} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" onClick={() => this.handleClick()}>Save change</Button>
                                <Button variant="outlined" color="primary">Cancel </Button>
                            </Grid>
                        </Grid>
                    </form>

                </Paper>
            </React.Fragment>
        );
    }
}

function mapState(state) {
    const { users, deleting } = state;
    return { users, deleting };
}

export default connect(mapState, {
    getByUserName: userActions.getByUserName,
    updateUser: userActions.updateUser,
    // getByID: usersActions.getById
})(withStyles({ withTheme: true })(EditProfile));