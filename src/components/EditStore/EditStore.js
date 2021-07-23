import { Card, Button, Container, FormControl, FormLabel, makeStyles, Grid, Paper, Tab, Tabs, TextField, Typography, withStyles } from "@material-ui/core"
import { Delete, Edit, PostAdd } from "@material-ui/icons";
import React from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from "@material-ui/data-grid";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { skillActions, storeActions } from "../../_actions";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

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

const options = [
    'Choose store manager',
];
var defaultOption = options[0];
var tmp = 1;
class EditStore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            store: {
                name: '',
                address: '',
                phone: '',
                storeManager: '',
                id: props.match.params.id
            },
            submitted: false,
            value: 1,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        console.log("chưa làm gì nè");
        console.log(props.items)
    };


    handleChange(event) {
        const { name, value } = event.target;
        var { store } = this.state;
        const { stores } = this.props;
        console.log("stores trước khi change nè ")
        console.log(stores)
        // if (store.name === '' && store.address === '' && store.phone === '') {
        //     store = stores;
        // }
        // else
            this.setState({
                store: {
                    ...store,
                    [name]: value
                }
            });
        console.log("store sau khi change nè ")
        console.log(store)
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { store } = this.state;

    }
    handleClick(event) {
        // event.preventDefault();

        this.setState({ submitted: true });
        const { store } = this.state;
        // const { stores } = this.props;
        // console.log("stores trước khi change nè ")
        // console.log(stores)
        // if (store.name === '' && store.address === '' && store.phone === '') {
        //     store.name = stores;
        // }
        this.props.updateStore(store);
    }
    componentDidMount() {
        this.props.getByID(this.props.match.params.id);
        console.log("DID MOUNT NE")
        console.log(this.props.stores.items)
    }
    loadData() {
        // this.props.getByID(this.props.match.params.id);
    }
    // componentDidUpdate() {
    //     this.setState({
    //             store: {
    //                 name: this.props.stores.items.name,
    //                 address: this.props.stores.items.address,
    //                 phone: this.props.stores.items.phone,
    //             },
    //         })
    // }
    

    render() {
        const { store, stores, type } = this.props;
        // this.loadData()
        console.log("render ne")
        console.log(this.props)
        if (!this.props.stores.items) {
            return <p>...Loading</p>;
        }
        console.log(stores.items);
        if(tmp === 2) this.setState({
            store: {
                name: stores.items.name,
                address: stores.items.address,
                phone: stores.items.phone,
                id: this.props.match.params.id
            },
        })
        tmp++;
        console.log("store ne")
        console.log(this.state.store.name)
        console.log(tmp)
        // this.loadData(stores)
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
                                <Grid item xs={6}>
                                    <FormControl margin="normal" fullWidth>
                                        <FormLabel >Store Manager</FormLabel>
                                        <TextField name="storeManager" size="small" variant="outlined" defaultValue={''} onChange={this.handleChange} />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl margin="normal" fullWidth>
                                    <FormLabel >Store's Address</FormLabel>
                                    <TextField name="address" size="small" variant="outlined" defaultValue={stores.items.address} onChange={this.handleChange} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
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
    return {
        stores,
        deleting,
    };
}

export default connect(mapState, {
    updateStore: storeActions.update,
    getByID: storeActions.getById
})(withStyles({ withTheme: true })(EditStore));