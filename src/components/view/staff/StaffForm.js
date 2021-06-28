import React from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Accordion, AccordionDetails, AccordionSummary, Button, Card, CardContent, CardHeader, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormLabel, Grid, makeStyles, MenuItem, OutlinedInput, Paper, Select, TextField, Typography, useTheme } from '@material-ui/core';
import { CardCustom } from '../../CardCustom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class StaffForm extends React.Component {

    constructor(props) {
        super(props);

        this.skills = props.skills;
        this.skillLevels = props.skillLevels;
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
            <FormControl margin="normal" error={touched && error} fullWidth>
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
        // console.log(formValues);
        this.props.onSubmit(formValues);
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
                            <MenuItem value={0} selected>Beginner</MenuItem>
                            <MenuItem value={1}>Immegiate</MenuItem>
                            <MenuItem value={2}>Experience</MenuItem>
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
                    <Grid container spacing={5} >
                        <Grid item xs={12}>
                            <CardCustom header='General'>
                                <Grid container direction="column" spacing={1} >
                                    <Grid container item spacing={3} >
                                        <Grid item xs={6}>
                                            <Field name="firstname" component={this.renderInput} label="First name" />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Field name="lastname" component={this.renderInput} label="Last name" />
                                        </Grid>

                                    </Grid>

                                    <Grid item xs={12}>
                                        <Field name="address" component={this.renderInput} label="Address" />
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
                        <Grid item xs={6}>
                            <CardCustom header='Job Information'>
                                <Grid container direction="column" spacing={1} >
                                    <Grid container item spacing={3} >
                                        <Grid item xs={6}>
                                            <Field name="workAt" component={this.renderSelect} label="Wort at">
                                                <MenuItem value={1}>Store 1</MenuItem>
                                                <MenuItem value={0}>Store 2</MenuItem>
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
                                                <MenuItem value={1}>Fulltime</MenuItem>
                                                <MenuItem value={0}>Parttime</MenuItem>
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

    if (!formValues.title) {
        error.title = "You must enter a title";
    }
    if (!formValues.description) {
        error.description = "You must enter a description";
    }
    return error;
}


export default reduxForm(
    {
        form: "staffForm",
        validate
    }
)(StaffForm);
