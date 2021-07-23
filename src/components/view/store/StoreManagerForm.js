import React from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Accordion, AccordionDetails, AccordionSummary, Button, Card, CardContent, CardHeader, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormLabel, Grid, makeStyles, MenuItem, OutlinedInput, Paper, Select, TextField, Typography, useTheme } from '@material-ui/core';
import { CardCustom } from '../../CardCustom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { levels } from "../../../_constants/levelData";
class StoreForm extends React.Component {

    constructor(props) {
        super(props);

        this.skills = props.skills;

        console.log(props);
    }

    state = {

    }

    renderInput = ({ label, input, type = "text", meta: { touched, invalid, error }, InputProps }) => {

        return (
            <div>
                <FormControl margin="normal" fullWidth>
                    <FormLabel>{label}</FormLabel>
                    <TextField  {...input} type={type} variant="outlined" InputProps={InputProps} error={touched && invalid}
                        helperText={touched && error} size="small" />
                </FormControl>
            </div>);
    }

    renderSelect = ({ label, input, meta: { touched, invalid, error }, InputProps, children }) => {

        return (
            <FormControl margin="normal" error={touched && invalid} fullWidth>
                <FormLabel >{label}</FormLabel>
                <Select {...input} variant="outlined">
                    {children}
                </Select>
            </FormControl>);
    }
    renderCheckboxBase = ({ input }) => {
        return (<Checkbox {...input} />)
    }
    onSubmit = (formValues) => {

        const dataSubmit = {
            generalInfo: {
                username: formValues.username,
                firstName: formValues.firstName,
                password:  formValues.password,
                lastName: formValues.lastName,
                dob: formValues.dob,
                gender: formValues.gender,
                type: formValues.type,
                email: formValues.email,
                phone: formValues.phone,
                address: formValues.address
            },
            jobInformation: {
                storeId: formValues.workAt,
                username: formValues.username,
                isPrimaryStore: true,
                isManager: true,
            },
        }
        console.log(dataSubmit);
        this.props.onSubmit(dataSubmit);
    }

    render() {
        return (
            <CardContent >
                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Grid container spacing={3} >
                        <Grid item xs={12}>
                            <CardCustom header='General'>
                                <Grid container direction="column" spacing={1} >
                                    <Grid container item spacing={3} >
                                        <Grid item xs={6}>
                                            <Field name="firstName" component={this.renderInput} label="First name" />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Field name="lastName" component={this.renderInput} label="Last name" />
                                        </Grid>

                                    </Grid>

                                    <Grid container item spacing={2}>
                                        <Grid item xs={3}>
                                            <Field name="username"  component={this.renderInput} label="Username" />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Field name="password" type="password" component={this.renderInput} label="Password" />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Field name="workAt" component={this.renderSelect} label="Wort at">
                                                {this.props.stores ?
                                                    this.props.stores.map(store => (<MenuItem key={store.id} value={store.id}>{store.name}</MenuItem>)) :
                                                    null}
                                            </Field>
                                        </Grid>


                                        <Grid item xs={12}>
                                            <Field name="address" component={this.renderInput} label="Address" />
                                        </Grid>

                                    </Grid>
                                    <Grid container item spacing={3} >
                                        <Grid item xs={6}>
                                            <Field name="dob" type="date" component={this.renderInput} label="Day of birth" />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Field name="gender" component={this.renderSelect} label="Gender">
                                                <MenuItem value={1}>Male</MenuItem>
                                                <MenuItem value={0}>Female</MenuItem>
                                            </Field>
                                        </Grid>
                                    </Grid>
                                    <Grid container item spacing={3} >
                                        <Grid item xs={6} >
                                            <Field name="email" component={this.renderInput} label="Email" />
                                        </Grid>
                                        <Grid item xs={6} >
                                            <Field name="phone" component={this.renderInput} label="Phone" />
                                        </Grid>
                                    </Grid>


                                </Grid>
                            </CardCustom>
                        </Grid>
                        <Grid item container xs={12} justify="flex-end" spacing={1} direction="row">
                            <Grid item >
                                <Button type="submit" variant="contained" color="primary">Save change</Button>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" color="primary">Cancel </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        );
    }
}

const validate = (formValues) => {
    const error = {};

    if (!formValues.firstName) {
        error.firstName = "You must enter a firstName";
    }
    if (!formValues.lastName) {
        error.lastName = "You must enter a description";
    }

    if (!formValues.email) {
        error.email = "You must enter a email";
    }

    if (!formValues.username) {
        error.username = "You must enter a username";
    }

    if (!formValues.type) {
        error.type = "You must enter a type staff";
    }

    if (!formValues.workAt) {
        error.type = "You must choose a store";
    }

    return error;
}




export default reduxForm(
    {
        form: "storeForm",
        validate
    }
)(StoreForm);
