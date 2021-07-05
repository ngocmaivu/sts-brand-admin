import {
    CardHeader, Paper, Divider, Typography,
    createStyles, withStyles, CardContent, Grid,
    FormControl, MenuItem, FormLabel, Select, TextField, Button, Tabs, Box, Table, TableRow, TableHead, TableCell, TableBody, AccordionDetails, AccordionSummary, Accordion
} from '@material-ui/core';
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import React from 'react';
import { CardCustom } from '../../CardCustom';
import './schedule.css';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Tab } from '@material-ui/core';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import PropTypes from 'prop-types';
import Demand from './Demand';
const styles = (Theme) => createStyles({
    inputAutoComplete: {
        "& .MuiInputBase-root": {
            padding: "0 0 0 10px"
        }

    },
    container: {
        padding: 10,
        height: "100%"
    }
})

const timeSlots = Array.from(new Array(24 * 2)).map(
    (_, index) => ({
        title: `${index < 20 ? '0' : ''}${Math.floor(index / 2)}:${index % 2 === 0 ? '00' : '30'}`,
        value: index
    })
);



const timeSlotss = [
    { title: '0:00', value: 0 }
]

const SectionSetting = ({ label, children, }) => {
    return (
        <Grid style={{ borderBottom: "1px solid #dfe2e6", paddingBlock: 15 }} container item alignItems="center" >
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
            style={{ width: '100%', height: "85%" }}
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

class SettingSchedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 1
        }

        this.constraintSpecific = [
            { name: "a", title: "Min Day Off", unit: "day", min: 0, max: 7 },
            { name: "b", title: "Max Day Off", unit: "day", min: 0, max: 7 },

            { name: "c", title: "Min Working Time of the week", unit: "hour", min: 0, max: 150 },
            { name: "d", title: "Max Working Time of the week", unit: "hour", min: 0, max: 150 },

            { name: "e", title: "Min Working Time of the day", unit: "hour", min: 0, max: 48 },
            { name: "f", title: "Max Working Time of the day", unit: "hour", min: 0, max: 48 },

            { name: "aa", title: "Min shift duration (30 minutes)", unit: "hour", min: 0, max: 48 },
            { name: "sa", title: "Max shift duration (30 minutes)", unit: "hour", min: 0, max: 48 },

            { name: "va", title: "Max number of shift of the day", unit: "number", min: 0, max: 5 }
        ];

        this.constraintGeneral = [
            { name: "as", title: "Min distance between 2 shifts", unit: "hour", min: 0, max: 7 },
        ]
    }

    getTimeSlots = (max) => Array.from(new Array(max)).map(
        (_, index) => ({
            title: `${index < 20 ? '0' : ''}${Math.floor(index / 2)}h${index % 2 === 0 ? '00' : '30'}`,
            value: index
        })
    )

    renderInputNumber = ({ label, key, input, type = "number", meta: { touched, invalid, error }, InputProps, min, max }) => {
        return (
            <SectionSetting label={label} key={key} >
                <TextField classes={{
                    "root": this.props.classes.inputAutoComplete
                }} size="small" type="number" variant="outlined" min={min} max={max} />
            </SectionSetting>
        );
    }


    renderInputHour = ({ label, input, key, type = "number", meta: { touched, invalid, error }, InputProps, min, max }) => {
        const timeSlotsCustom = this.getTimeSlots(max);

        const { onChange, ...rest } = input;
        const getSelectedOption = () => {
            return timeSlotsCustom.find(o => o.value === input.value);
        };
        return (
            <SectionSetting label={label} key={key}>
                <Autocomplete
                    autoSelect
                    options={timeSlotsCustom}
                    value={getSelectedOption()}
                    onChange={(e, newValue) => {
                        onChange(newValue);
                    }}
                    getOptionLabel={(option) => option.title}
                    getOptionSelected={(option, value) => {
                        return option.title === value.title || option.title === input.value;
                    }}

                    renderInput={(params) => (
                        <TextField
                            classes={{
                                "root": this.props.classes.inputAutoComplete
                            }}
                            value={input.value}
                            {...rest}
                            {...params} variant="outlined" />
                    )}
                />
            </SectionSetting>
        );
    }


    renderConstraintFields = (constraints, prefix) => {

        return constraints.map(constraint => {
            switch (constraint.unit) {
                case "day":
                case "number":
                    return (<Field key={constraints.name} name={`${prefix}${constraint.name}`} label={constraint.title} component={this.renderInputNumber}
                        min={constraint.min} max={constraint.max} />);
                case "hour":
                    return (<Field key={constraints.name} name={`${prefix}${constraint.name}`} label={constraint.title} component={this.renderInputHour}
                        min={constraint.min} max={constraint.max} />);
            }

        });
    }


    handleChange = (event, newValue) => {
        console.log(event);
        this.setState({ tabIndex: newValue });
    }

    render() {
        const classes = this.props.classes;
        return (
            <Paper className={classes.container}>
                <CardHeader variant="h2" title=" Template Schedule Setting" disableTypography={false}
                    action={
                        <Button variant="contained" color="primary">Add Personal Custom Setting</Button>
                    }
                />
                <Tabs
                    value={this.state.tabIndex}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={this.handleChange}
                    aria-label="disabled tabs example"

                >
                    <Tab label="Constraints " value={0} />
                    <Tab label="Demands" value={1} />
                </Tabs>
                <TabPanel value={this.state.tabIndex} index={0}>
                    <CardContent>
                        <form>
                            <Grid container spacing={5} >
                                <Grid item xs={12}>
                                    <CardCustom header='General'>
                                        <Grid container direction="column" spacing={1} style={{ paddingLeft: 20 }} >
                                            <SectionSetting label="Operating Hour" >
                                                <Grid container spacing={2} alignItems="center">
                                                    <Grid item style={{ width: 180 }}>
                                                        <Autocomplete
                                                            options={timeSlots}
                                                            getOptionLabel={(option) => option.title}
                                                            getOptionSelected={(option, value) => option.title === value.title}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    classes={{
                                                                        "root": classes.inputAutoComplete
                                                                    }}

                                                                    {...params} variant="outlined" />
                                                            )}
                                                        />
                                                    </Grid>
                                                    <Grid item>To</Grid>
                                                    <Grid item style={{ width: 180 }}>
                                                        <Autocomplete
                                                            style={{ padding: 0 }}
                                                            options={timeSlots}
                                                            getOptionLabel={(option) => option.title}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    classes={{
                                                                        "root": classes.inputAutoComplete
                                                                    }}
                                                                    {...params} variant="outlined" />
                                                            )}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </SectionSetting>
                                            <SectionSetting label="Min distance between 2 shifts " >
                                                <TextField classes={{
                                                    "root": classes.inputAutoComplete
                                                }} size="small" type="number" variant="outlined" />
                                            </SectionSetting>
                                        </Grid>
                                    </CardCustom>
                                </Grid>
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
                                        <Button variant="contained" color="primary">Save change</Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="outlined" color="primary">Cancel </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </TabPanel>

                <TabPanel value={this.state.tabIndex} index={1}>
                    <Demand />
                </TabPanel>

                <Divider />
            </Paper >
        );
    }
}



export default reduxForm(
    {
        form: "settingForm",
    }
)(withStyles(styles, { withTheme: true })(SettingSchedule));
