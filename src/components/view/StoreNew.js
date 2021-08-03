import { Button, Card, CardContent, CardHeader, Chip, Divider, FormControl, FormLabel, Grid, makeStyles, MenuItem, OutlinedInput, Paper, Select, TextField, Typography, useTheme } from '@material-ui/core';
import React from 'react';
import { CardCustom } from '../CardCustom';
import { Link } from 'react-router-dom';
import { storeActions } from '../../_actions/store.action'
import { connect } from 'react-redux';
import { store } from '../../_helpers';

const user = JSON.parse(localStorage.getItem("jwt_decode"))
const useStyles = makeStyles((theme) => ({
    container: {

    },
    containerContent: {
        padding: "40px 30px"
    },
    input: {

    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

class StoreNew extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            store: {
                brandId: user.brandId,
                name: '',
                address: '',
                phone: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { store } = this.state;
        this.setState({
            store: {
                ...store,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { store } = this.state;
        if (store.name) {
            this.props.create(store);
        }
    }
    handleClick(event) {
        // event.preventDefault();

        this.setState({ submitted: true });
        const { store } = this.state;
        // if (store.name) {
            this.props.create(store);
        // }
        console.log('this is:', this);
    }
    render() {
        const { registering } = this.props;
        const { store, submitted } = this.state;
        return (
            <Paper>
                <CardHeader title={
                    <Typography variant="h2">
                        Add New Store
                    </Typography>
                } disableTypography={true}
                />

                <Divider />
                <CardContent>
                    <form >
                        <Grid container direction="column" spacing={5} >
                            <Grid item xs={12}>
                                <CardCustom header='General'>
                                    <Grid container direction="column" spacing={1} >
                                        <Grid container item spacing={3} >
                                            <Grid item xs={6}>
                                                <FormControl margin="normal" fullWidth>
                                                    <FormLabel >Store Name</FormLabel>
                                                    <TextField type="input" name="name" size="small" variant="outlined" onChange={this.handleChange} />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={6} >
                                            <FormControl margin="normal" fullWidth>
                                                <FormLabel >Phone</FormLabel>
                                                <TextField name="phone" size="small" variant="outlined" onChange={this.handleChange} />
                                            </FormControl>
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <FormControl margin="normal" fullWidth>
                                                <FormLabel >Address</FormLabel>
                                                <TextField name="address" size="small" variant="outlined" onChange={this.handleChange} />
                                            </FormControl>
                                        </Grid>
                                        <Grid container item spacing={3} >
                                            {/* <Grid item xs={6} >
                                                {renderInput("Email")}
                                            </Grid> */}
                                            <Grid item xs={6} >
                                            <FormControl margin="normal" fullWidth>
                                                <FormLabel >Phone</FormLabel>
                                                <TextField name="phone" size="small" variant="outlined" onChange={this.handleChange} />
                                            </FormControl>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardCustom>
                            </Grid>
                            <Grid item container xs={12} justify="flex-end" spacing={1} direction="row">
                                <Grid item xs={2} >
                                    <Button onClick={() => this.handleClick()} variant="contained" color="primary">Save change</Button>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button variant="outlined" color="primary" component={Link} to="/stores">Cancel </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Paper>
        );
    }
}

function mapState(state) {
    // const { creating } = state.creating;
    return {};
}

const actionCreators = {
    create: storeActions.create
}

const connectedStoreNew = connect(mapState, actionCreators)(StoreNew);
export { connectedStoreNew as StoreNew };