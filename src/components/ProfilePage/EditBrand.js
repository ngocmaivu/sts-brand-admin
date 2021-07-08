import { Card, Button, Container, FormControl, FormLabel, makeStyles, Grid, Paper, Tab, Tabs, TextField, Typography, withStyles } from "@material-ui/core"
import { Delete, Edit, PostAdd } from "@material-ui/icons";
import React from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from "@material-ui/data-grid";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { brandActions, skillActions } from "../../_actions";

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


class EditBrand extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            brand: {
                name: props.brand.items.name,
                // address: '',
                hotline: props.brand.items.hotline,
                logoImg: '',
            },
            submitted: false,
            value: 1,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    };
    handleChange(event) {
        const { name, value } = event.target;
        const { brand } = this.state;
        this.setState({
            brand: {
                ...brand,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { brand } = this.state;
        // if (brand.name) {
        //     this.props.updateBrand(brand);
        // }
    }
    handleClick(event) {
        // event.preventDefault();

        this.setState({ submitted: true });
        const { brand } = this.state;
        this.props.updateBrand(brand);
        console.log('this is:', brand);
    }
    componentDidMount() {
        this.props.getByID();
    }


    render() {
        const { brand, type } = this.props;
        console.log(brand)
        if (!this.props.brand.items) {
            return <p>...Loading</p>;
        }
        return (

            <React.Fragment>
                <Card style={{ padding: '10px', marginBottom: '20px' }}>
                    <h1>Edit Brand</h1>
                </Card>
                <Paper style={{ padding: '20px' }} className={this.props.classes.container} elevation={0}>
                    <form>
                        <Grid container direction="column" spacing={1}>
                            <Grid container item spacing={3} >
                                <Grid item xs={6}>
                                    <FormControl margin="normal" className={this.props.classes.input} fullWidth>
                                        <FormLabel >Brand name</FormLabel>
                                        <TextField name="name" size="small" variant="outlined" defaultValue={brand.items.name} onChange={this.handleChange} />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            {/* <Grid item xs={12}>
                                <FormControl margin="normal" fullWidth>
                                    <FormLabel >Brand's Address</FormLabel>
                                    <TextField name="address" size="small" variant="outlined" defaultValue={brand.items.address} onChange={this.handleChange}/>
                                </FormControl>
                            </Grid> */}
                            <Grid item xs={12} >
                                <FormControl margin="normal" fullWidth>
                                    <FormLabel >Hotline</FormLabel>
                                    <TextField name="hotline" size="small" variant="outlined" defaultValue={brand.items.hotline} onChange={this.handleChange} />
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
    const { brand, deleting } = state;
    return { brand, deleting };
}

export default connect(mapState, {
    updateBrand: brandActions.updateBrand,
    getByID: brandActions.getById
})(withStyles({ withTheme: true })(EditBrand));