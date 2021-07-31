import React from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Accordion, AccordionDetails, AccordionSummary, Button, Card, CardContent, CardHeader, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormLabel, Grid, makeStyles, MenuItem, OutlinedInput, Paper, Select, TextField, Typography, useTheme } from '@material-ui/core';
import { CardCustom } from '../../CardCustom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { levels } from "../../../_constants/levelData";
class StaffForm extends React.Component {

    constructor(props) {
        super(props);

        this.skills = props.skills;

        console.log(props);
    }

    state = {

    }

    renderInput = ({ label, input, type = "text", disabled, meta: { touched, invalid, error }, InputProps }) => {

        return (
            <div>
                <FormControl margin="normal" fullWidth>
                    <FormLabel>{label}</FormLabel>
                    <TextField  {...input} type={type} variant="outlined" InputProps={InputProps} disabled={disabled} error={touched && invalid}
                        helperText={touched && error} size="small" />
                </FormControl>
            </div>);
    }

    renderSelect = ({ label, input, meta: { touched, invalid, error }, InputProps, children }) => {

        return (
            <FormControl margin="normal" error={touched && invalid} fullWidth>
                <FormLabel >{label}</FormLabel>
                <Select {...input} variant="outlined" onChange={value => input.onChange(value)}>
                    {children}
                </Select>
            </FormControl>);
    }
    renderCheckboxBase = ({ input }) => {

        return (<Checkbox checked={input.value ? true : false}
            onChange={input.onChange} />)
    }
    onSubmit = (formValues) => {

        console.log(formValues);

        const skillData = this.props.skills
            .filter(skill => formValues[`skill${skill.id}`] == true)
            .map(skill => {
                return {
                    skillId: skill.id,
                    level: formValues[`skill${skill.id}Level`],
                    username: formValues.username,
                }
            });

        const dataSubmit = {
            generalInfo: {
                username: formValues.username,
                firstName: formValues.firstName,
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
                isPrimaryStore: true,
            },
            staffSkills: skillData
        }

        this.props.onSubmit(dataSubmit);
    }

    renderSkillFields = () => {
        return this.skills.map(skill => (
            <Grid item key={skill.id}>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <FormControlLabel
                            onClick={(event) => event.stopPropagation()}
                            onFocus={(event) => event.stopPropagation()}
                            control={<Field name={`skill${skill.id}`} component={this.renderCheckboxBase} />}
                            label={skill.name}
                        />
                    </AccordionSummary>
                    <AccordionDetails>
                        <Field name={`skill${skill.id}Level`} component={this.renderSelect} label="Skill level" >
                            {levels.map(level => (
                                <MenuItem key={level.value} value={level.value} selected>{level.label}</MenuItem>
                            ))}
                        </Field>
                    </AccordionDetails>

                </Accordion >
            </Grid>
        ));
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
                                        <Grid item xs={6}>
                                            <Field name="username" component={this.renderInput} label="Username" disabled={this.props.type == "edit"} />
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
                                            <Field name="email" component={this.renderInput} label="Email" disabled={this.props.type == "edit"} />
                                        </Grid>
                                        <Grid item xs={6} >
                                            <Field name="phone" component={this.renderInput} label="Phone" />
                                        </Grid>
                                    </Grid>


                                </Grid>
                            </CardCustom>
                        </Grid>
                        <Grid item xs={6}>
                            <CardCustom header='Job Information'>
                                <Grid container direction="column" spacing={1} >
                                    <Grid container item spacing={3} >
                                        <Grid item xs={6}>
                                            <Field name="workAt" component={this.renderSelect} label="Wort at">
                                                {this.props.stores ?
                                                    this.props.stores.map(store => (<MenuItem key={store.id} value={store.id}>{store.name}</MenuItem>)) :
                                                    null}
                                            </Field>
                                        </Grid>
                                    </Grid>


                                    <Grid container item spacing={3} >
                                        <Grid item xs={6}>
                                            <Field name="hireOn" type="date" component={this.renderInput} label="Hired On" />
                                            {/* <FormControl margin="normal"  fullWidth>
                                            <FormLabel >Hired On</FormLabel>
                                            <TextField
                                                id="date"
                                                type="date"
                                                size="small" variant="outlined"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </FormControl> */}
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Field name="type" component={this.renderSelect} label="Type">
                                                <MenuItem value={0}>Full time</MenuItem>
                                                <MenuItem value={1}>Part time</MenuItem>
                                            </Field>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardCustom>
                        </Grid>
                        <Grid item xs={6}>
                            <CardCustom header='Skills'>
                                <Grid container direction="column" spacing={1} >
                                    {this.renderSkillFields()}
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


    if (!formValues.workAt) {
        error.type = "You must choose a store";
    }

    return error;
}




export default reduxForm(
    {
        form: "staffForm",
        validate
    }
)(StaffForm);
