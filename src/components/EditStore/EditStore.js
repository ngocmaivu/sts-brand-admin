import { Card, Button, Container, FormControl, FormLabel, makeStyles, Grid, Paper, Tab, Tabs, TextField, Typography, withStyles } from "@material-ui/core"
import { Delete, Edit, PostAdd } from "@material-ui/icons";
import React from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from "@material-ui/data-grid";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { storesActions, skillActions, storeActions } from "../../_actions";

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


class EditStore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            store: {
                name: props.stores.items.name,
                address: props.stores.items.address,
                phone: props.stores.items.phone,
                id: props.match.params.id
            },
            submitted: false,
            value: 1,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    };
    handleChange(event) {
        const { name, value } = event.target;
        const { store } = this.state;
        this.setState({
            store: {
                ...store,
                [name]: value
            }
        });
        console.log("change: " + store)
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { stores } = this.state;

    }
    handleClick(event) {
        // event.preventDefault();

        this.setState({ submitted: true });
        const { store } = this.state;
        this.props.updateStore(store);
    }
    componentDidMount() {
        this.props.getByID(this.props.match.params.id);
    }


    render() {
        const { stores, type } = this.props;
        console.log(this.props)
        if (!this.props.stores.items) {
            return <p>...Loading</p>;
        }
        console.log(stores.items)
        return (
            <React.Fragment>
                <Card style={{ padding: '10px', marginBottom: '20px' }}>
                    <h1>Edit Store</h1>
                </Card>
                <Paper style={{ padding: '20px' }} elevation={0}>
                    <form>
                        <Grid container direction="column" spacing={1}>
                            <Grid container item spacing={3} >
                                <Grid item xs={6}>
                                    <FormControl margin="normal" fullWidth>
                                        <FormLabel >Store name</FormLabel>
                                        <TextField name="name" size="small" variant="outlined" defaultValue={stores.items.name} onChange={this.handleChange} />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}> 
                                <FormControl margin="normal" fullWidth>
                                    <FormLabel >Store's Address</FormLabel>
                                    <TextField name="address" size="small" variant="outlined" defaultValue={stores.items.address} onChange={this.handleChange} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} >
                                <FormControl margin="normal" fullWidth>
                                    <FormLabel >Phone Number</FormLabel>
                                    <TextField name="phone" size="small" variant="outlined" defaultValue={stores.items.phone} onChange={this.handleChange} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" onClick={() => this.handleClick()}>Save change</Button>
                                <Button variant="outlined" color="primary" component={Link} to="/stores">Cancel </Button>
                            </Grid>
                        </Grid>

                    </form>

                </Paper>
            </React.Fragment>
        );
    }
}

function mapState(state) {
    const { stores, deleting } = state;
    return { stores, deleting };
}

export default connect(mapState, {
    updateStore: storeActions.update,
    getByID: storeActions.getById
})(withStyles({ withTheme: true })(EditStore));