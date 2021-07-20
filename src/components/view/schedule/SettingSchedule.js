import {
    CardHeader, Paper, Divider, Typography,
    createStyles, withStyles, CardContent, Grid, IconButton,
    FormControl, MenuItem, FormLabel, Select, TextField, Button, Tabs,
} from '@material-ui/core';

import isSameDay from "date-fns/isSameDay";

import startOfWeek from "date-fns/startOfWeek";

import React from 'react';
import { CardCustom } from '../../CardCustom';
import './schedule.css';

import { Tab } from '@material-ui/core';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import PropTypes from 'prop-types';
import Demand from '../demand';
import SettingConstraintsForm from './SettingConstraintsForm';
import { getWeekScheduleConstraint, getWeekSchedule, commitConstraint } from "../../../_services";

import { getFirstDayOfWeek } from "../../../ultis/scheduleHandle";
import WeekPicker from "../../WeekPicker";
const styles = (theme) => createStyles({
    container: {
        padding: 10,
        height: "100%"
    },

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
            dateStart: startOfWeek(new Date(), {
                weekStartsOn: 1
            }),
            weekScheduleId: null,
            constraintData: null,
            tabIndex: 0
        };
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


    }


    handleWeekChange = async (date) => {
        if (isSameDay(startOfWeek(date, {
            weekStartsOn: 1
        }), this.state.dateStart)) return;

        this.setState({
            dateStart: startOfWeek(date, {
                weekStartsOn: 1
            })
        });

    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (!isSameDay(prevState.dateStart, this.state.dateStart)) {
            this.setState({ constraintData: null });
            this.updateConstraintData();
            // console.log(prevState.dateStart, this.state.dateStart);
        }
    }

    handleChange = (event, newValue) => {
        console.log(event);
        this.setState({ tabIndex: newValue });
    }

    onSubmitConstraints = (constraintValues) => {
        console.log(constraintValues);
        console.log(this.state.constraintData);
        // constraintData
        // constraintValues.forEach(constraint => {
        //     constraint.id = this.state.constraintData.find(constraintState => constraintState.staffType == constraint.staffType).id;
        // });
        console.log(constraintValues);
        commitConstraint(constraintValues[0]);
        commitConstraint(constraintValues[1]);

    }

    updateWeekScheuleId = async () => {
        const WeekSchedule = await getWeekSchedule(getFirstDayOfWeek(new Date(this.state.dateStart)));

        if (!WeekSchedule) {
            console.log("GET WeekSchedule ERROR");
            return;
        }
        console.log(WeekSchedule.id);
        this.setState({ weekScheduleId: WeekSchedule.id });
    }

    updateConstraintData = async () => {
        await this.updateWeekScheuleId();
        const storeScheduleDetails = await getWeekScheduleConstraint(this.state.weekScheduleId);

        this.renderConstraintData(storeScheduleDetails);
    }

    componentDidMount = async () => {
        await this.updateConstraintData();
    }


    renderConstraintData = (storeScheduleDetails) => {
        if (storeScheduleDetails) {
            var constraintData = {};
            storeScheduleDetails.forEach(constraint => {
                var prefix = constraint.staffType == 0 ? "ft" : "pt"

                Object.keys(constraint).forEach(key => {
                    constraintData = {
                        ...constraintData, [`${prefix}${key}`]: constraint[key] ? constraint[key] : 0
                    }
                })

            });
            console.log(constraintData);
            this.setState({ constraintData: constraintData });

        }

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

                <FormControl margin="normal" >
                    <FormLabel >Select Week</FormLabel>
                    <WeekPicker
                        value={this.state.dateStart}
                        onChange={this.handleWeekChange}
                    />
                </FormControl>
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
                    {
                        this.state.constraintData ? (
                            <SettingConstraintsForm initialValues={this.state.constraintData} onSubmit={this.onSubmitConstraints} />
                        ) : "...Loading"
                    }
                </TabPanel>

                <TabPanel value={this.state.tabIndex} index={1}>
                    <Demand dateStart={this.state.dateStart} weekScheduleId={this.state.weekScheduleId} />
                </TabPanel>

                <Divider />
            </Paper >
        );
    }
}



export default withStyles(styles, { withTheme: true })(SettingSchedule);
