import {
    createStyles, withStyles, CardContent, Grid,
    TextField, Button, Card,
} from '@material-ui/core';

import React from 'react';
import { CardCustom } from '../../CardCustom';
import './schedule.css';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Field, reduxForm, } from 'redux-form';
import PropTypes from 'prop-types';
const styles = (Theme) => createStyles({
    inputAutoComplete: {
        "& .MuiInputBase-root": {
            padding: "0 0 0 10px"
        }

    },
    container: {
     
        height: "100%",
        width: "100%"
    }
})

const timeSlots = Array.from(new Array(24 * 2)).map(
    (_, index) => ({
        title: `${index < 20 ? '0' : ''}${Math.floor(index / 2)}:${index % 2 === 0 ? '00' : '30'}`,
        value: index
    })
);


const SectionSetting = ({ label, children, key }) => {
    return (
        <Grid style={{ borderBottom: "1px solid #dfe2e6", paddingBlock: 15 }} key={key} container item alignItems="center" >
            <Grid item style={{ maxWidth: 600, flexGrow: 1, fontWeight: 500 }}>{label}</Grid >
            {/* <Grid item style={{ flexGrow: 1 }}></Grid > */}
            <Grid item xs={6} >
                {children}
            </Grid>

        </Grid>
    );
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            style={{ width: '100%' }}
        >
            {value === index && (
                <React.Fragment>
                    {children}
                </React.Fragment>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

class SettingConstraintsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.constraintSpecific = [
            { name: "minDayOff", title: "Min Day Off", unit: "day", min: 0, max: 7 },
            { name: "maxDayOff", title: "Max Day Off", unit: "day", min: 0, max: 7 },

            { name: "minHoursPerWeek", title: "Min Working Time of the week", unit: "hour", min: 0, max: 150 },
            { name: "maxHoursPerWeek", title: "Max Working Time of the week", unit: "hour", min: 0, max: 150 },


            { name: "maxHoursPerDay", title: "Max Working Time of the day", unit: "hour", min: 0, max: 48 },

            { name: "minShiftDuration", title: "Min shift duration (30 minutes)", unit: "hour", min: 0, max: 48 },
            { name: "maxShiftDuration", title: "Max shift duration (30 minutes)", unit: "hour", min: 0, max: 48 },

            { name: "maxShiftPerDay", title: "Max number of shift of the day", unit: "number", min: 0, max: 5 }
        ];

        this.constraintGeneral = [
            { name: "minDistance", title: "Min distance between 2 shifts", unit: "hour", min: 0, max: 7 },
        ]
    }

    getTimeSlots = (max) => Array.from(new Array(max)).map(
        (_, index) => ({
            label: `${index < 20 ? '0' : ''}${Math.floor(index / 2)}h${index % 2 === 0 ? '00' : '30'}`,
            value: index / 2
        })
    )

    renderInputNumber = ({ label, key, input, type = "number", meta: { touched, invalid, error }, InputProps, min, max }) => {
        if (!input.value) {
            input.value = 1;
        }

        return (
            <SectionSetting label={label} key={key} >
                <TextField classes={{
                    "root": this.props.classes.inputAutoComplete
                }} size="small" {...input} type="number" variant="outlined" min={min} max={max} />
            </SectionSetting>
        );
    }


    renderInputHour = ({ label, input, key, meta: { touched, invalid, error }, InputProps, min, max }) => {
        const timeSlotsCustom = this.getTimeSlots(max);

        const { onChange } = input;
        const getSelectedOption = () => {

            if (input.value) {
                return timeSlotsCustom.find(o => o.value === input.value);
            } else {
                return timeSlotsCustom[0];
            }

        };

        return (
            <SectionSetting label={label} key={key}>
                <Autocomplete
                    autoSelect
                    options={timeSlotsCustom}
                    value={getSelectedOption()}
                    onChange={(e, newValue) => {
                        onChange(newValue.value);
                    }}
                    getOptionLabel={(option) => option.label}

                    // getOptionSelected={(option, value) => {
                    // console.log(value);
                    //     return option.value === input.value || option.value === value?.value;
                    // }}

                    renderInput={(params) => (
                        <TextField
                            classes={{
                                "root": this.props.classes.inputAutoComplete
                            }}

                            {...params} variant="outlined" />
                    )}
                />
            </SectionSetting>
        );
    }


    renderConstraintFields = (constraints, prefix) => {
        return constraints.map((constraint, index) => {
            switch (constraint.unit) {
                case "day":
                case "number":
                    return (<Field key={index} name={`${prefix}${constraint.name}`} label={constraint.title} component={this.renderInputNumber}
                        min={constraint.min} max={constraint.max} />);
                case "hour":
                    return (<Field key={index} name={`${prefix}${constraint.name}`} label={constraint.title} component={this.renderInputHour}
                        min={constraint.min} max={constraint.max} />);
            }

        });
    }

    onSubmit = (formValues) => {
        console.log(formValues);
        Object.keys(formValues).forEach(field => {

        });


        var ftconstraints = { staffType: 0 };
        var ptconstraints = { staffType: 1 };
        var prefixFT = "ft";
        var prefixPT = "pt";
        this.constraintSpecific.forEach(field => {
            ftconstraints = {
                ...ftconstraints,
                [field.name]: formValues[`${prefixFT}${field.name}`] ? formValues[`${prefixFT}${field.name}`] : 0
            }
            ptconstraints = {
                ...ptconstraints,
                [field.name]: formValues[`${prefixPT}${field.name}`] ? formValues[`${prefixPT}${field.name}`] : 0
            }
        });
        ftconstraints.id = this.props.initialValues.ftid;
        ptconstraints.id = this.props.initialValues.ptid;

        var listConstraitns = [ftconstraints, ptconstraints];

        this.props.onSubmit(listConstraitns);
    }

    render() {
        const classes = this.props.classes;
        return (
            <CardContent className={classes.container}>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Grid container spacing={2} direction="column" >
                        
                        <Grid item container direction="row" spacing={5}>
                            <Grid item xs={6}>
                                <CardCustom header='For fulltime'>
                                    <Grid container direction="column" spacing={1} style={{ paddingLeft: 20 }} >
                                        {this.renderConstraintFields(this.constraintSpecific, "ft")}
                                    </Grid>
                                </CardCustom>
                            </Grid>
                            <Grid item xs={6}>
                                <CardCustom header='For parttime'>
                                    <Grid container direction="column" spacing={1} style={{ paddingLeft: 20 }} >
                                        {this.renderConstraintFields(this.constraintSpecific, "pt")}
                                    </Grid>
                                </CardCustom>
                            </Grid>
                        </Grid>

                        <Grid item container xs={12} justify="flex-end" spacing={1} direction="row">
                            <Grid item >
                                <Button variant="contained" color="primary" type="submit">Save change</Button>
                            </Grid>
                            <Grid item>
                                {/* <Button variant="outlined" color="primary">Reset</Button> */}
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        );
    }
}



export default reduxForm(
    {
        form: "settingForm",
    }
)(withStyles(styles, { withTheme: true })(SettingConstraintsForm));
