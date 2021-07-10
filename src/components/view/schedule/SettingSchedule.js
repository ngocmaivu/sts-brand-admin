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
import SettingConstraintsForm from './SettingConstraintsForm';
const styles = (Theme) => createStyles({
    container: {
        padding: 10,
        height: "100%"
    }
})


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
        this.storeScheduleDetails = [
            {
                weekScheduleId: 0,
                staffType: 0,
                minDayOff: 0,
                maxDayOff: 0,
                minHoursPerWeek: 0,
                maxHoursPerWeek: 0,
                minHoursPerDay: 0,
                maxHoursPerDay: 0,
                minShiftDuration: 0,
                maxShiftDuration: 0,
                maxShiftPerDay: 0
            },
            {
                weekScheduleId: 0,
                staffType: 1,
                minDayOff: 0,
                maxDayOff: 0,
                minHoursPerWeek: 0,
                maxHoursPerWeek: 0,
                minHoursPerDay: 0,
                maxHoursPerDay: 0,
                minShiftDuration: 0,
                maxShiftDuration: 0,
                maxShiftPerDay: 0
            }
        ];
        this.constraintData = {};
        this.storeScheduleDetails.forEach(constraint => {
            var prefix = constraint.staffType == 0 ? "ft" : "pt"

            Object.keys(constraint).forEach(key => {
                this.constraintData = {
                    ...this.constraintData, [`${prefix}${key}`]: constraint[key]
                }
            })

        })
    }
    state = {

    }

    handleChange = (event, newValue) => {
        console.log(event);
        this.setState({ tabIndex: newValue });
    }

    onSubmitConstraints = (constraintValues) => {
        console.log(constraintValues);
    }
    componentDidMount = () => {
        //get Form
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
                    <SettingConstraintsForm initialValues={this.constraintData} onSubmit={this.onSubmitConstraints}/>
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
