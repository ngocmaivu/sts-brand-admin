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
import { useStyles } from '@material-ui/pickers/views/Calendar/SlideTransition';
import PropTypes from 'prop-types';
import Demand from '../demand';
import SettingConstraintsForm from './SettingConstraintsForm';
import { getWeekScheduleConstraint, getWeekSchedule, updateConstraint } from "../../../_services";

import { getFirstDayOfWeek } from "../../../ultis/scheduleHandle";
import WeekPicker from "../../WeekPicker";
const styles = (theme) => createStyles({
    container: {
        padding: 10,
        height: "100%"
    },
})

<<<<<<< HEAD
=======
const timeSlots = Array.from(new Array(24 * 2)).map(
    (_, index) => ({
        title: `${index < 20 ? '0' : ''}${Math.floor(index / 2)}:${index % 2 === 0 ? '00' : '30'}`,
        value: index
    })
);

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
>>>>>>> parent of 6e10fd6 (push)

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    const classes = useStyles();
    return (
        <div
            role="tabpanel" className={classes.card}
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            style={{ width: '100%', height: "100%" }}
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

<<<<<<< HEAD

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
        updateConstraint(constraintValues[0]);
        updateConstraint(constraintValues[1]);

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
=======
>>>>>>> parent of 6e10fd6 (push)
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

                <CardHeader title={
                    <Typography variant="h2">
                        Template Schedule Setting
                    </Typography>
                } disableTypography={false}
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
<<<<<<< HEAD
=======
                    keep
>>>>>>> parent of 6e10fd6 (push)
                >
                    <Tab label="Constraints " value={0} />
                    <Tab label="Demands" value={1} />
                </Tabs>
                <TabPanel value={this.state.tabIndex} index={0}>
<<<<<<< HEAD
                    {
                        this.state.constraintData ? (
                            <SettingConstraintsForm initialValues={this.state.constraintData} onSubmit={this.onSubmitConstraints} />
                        ) : "...Loading"
                    }
                </TabPanel>

                <TabPanel value={this.state.tabIndex} index={1}>
                    <Demand dateStart={this.state.dateStart} weekScheduleId={this.state.weekScheduleId} />
=======
                    <CardContent>
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
                                            <SectionSetting label="Min Day Off" >
                                                <TextField classes={{
                                                    "root": classes.inputAutoComplete
                                                }} size="small" type="number" variant="outlined" />
                                            </SectionSetting>

                                            <SectionSetting label="Max Day Off" >
                                                <TextField classes={{
                                                    "root": classes.inputAutoComplete
                                                }} size="small" type="number" variant="outlined" />
                                            </SectionSetting>

                                            <SectionSetting label="Min Working Time of the week " >
                                                <TextField classes={{
                                                    "root": classes.inputAutoComplete
                                                }} size="small" type="number" variant="outlined" />
                                            </SectionSetting>

                                            <SectionSetting label="Max Working Time of the week " >
                                                <TextField classes={{
                                                    "root": classes.inputAutoComplete
                                                }} size="small" type="number" variant="outlined" />
                                            </SectionSetting>

                                            <SectionSetting label="Min Working Time of the day " >
                                                <TextField classes={{
                                                    "root": classes.inputAutoComplete
                                                }} size="small" type="number" variant="outlined" />
                                            </SectionSetting>

                                            <SectionSetting label="Max Working Time of the day " >
                                                <TextField classes={{
                                                    "root": classes.inputAutoComplete
                                                }} size="small" type="number" variant="outlined" />
                                            </SectionSetting>
                                            <SectionSetting label="Min shift duration (30 minutes)" >
                                                <TextField classes={{
                                                    "root": classes.inputAutoComplete
                                                }} size="small" type="number" variant="outlined" />
                                            </SectionSetting>

                                            <SectionSetting label="Max shift duration (30 minutes)" >
                                                <TextField classes={{
                                                    "root": classes.inputAutoComplete
                                                }} size="small" type="number" variant="outlined" />
                                            </SectionSetting>

                                            <SectionSetting label="Max number of shift of the day" >
                                                <TextField classes={{
                                                    "root": classes.inputAutoComplete
                                                }} size="small" type="number" variant="outlined" />
                                            </SectionSetting>
                                        </Grid>
                                    </CardCustom>
                                </Grid>
                                <Grid item xs={6}>
                                    <CardCustom header='For parttime'>
                                        <Grid container direction="column" spacing={1} style={{ paddingLeft: 20 }} >
                                            <SectionSetting label="Min Day Off" >
                                                <TextField classes={{
                                                    "root": classes.inputAutoComplete
                                                }} size="small" type="number" variant="outlined" />
                                            </SectionSetting>

                                            <SectionSetting label="Max Day Off" >
                                                <TextField classes={{
                                                    "root": classes.inputAutoComplete
                                                }} size="small" type="number" variant="outlined" />
                                            </SectionSetting>

                                            <SectionSetting label="Min Working Time of the week " >
                                                <TextField classes={{
                                                    "root": classes.inputAutoComplete
                                                }} size="small" type="number" variant="outlined" />
                                            </SectionSetting>

                                            <SectionSetting label="Max Working Time of the week " >
                                                <TextField classes={{
                                                    "root": classes.inputAutoComplete
                                                }} size="small" type="number" variant="outlined" />
                                            </SectionSetting>

                                            <SectionSetting label="Min Working Time of the day " >
                                                <TextField classes={{
                                                    "root": classes.inputAutoComplete
                                                }} size="small" type="number" variant="outlined" />
                                            </SectionSetting>

                                            <SectionSetting label="Max Working Time of the day " >
                                                <TextField classes={{
                                                    "root": classes.inputAutoComplete
                                                }} size="small" type="number" variant="outlined" />
                                            </SectionSetting>
                                            <SectionSetting label="Min shift duration (30 minutes)" >
                                                <TextField classes={{
                                                    "root": classes.inputAutoComplete
                                                }} size="small" type="number" variant="outlined" />
                                            </SectionSetting>

                                            <SectionSetting label="Max shift duration (30 minutes)" >
                                                <TextField classes={{
                                                    "root": classes.inputAutoComplete
                                                }} size="small" type="number" variant="outlined" />
                                            </SectionSetting>

                                            <SectionSetting label="Max number of shift of the day" >
                                                <TextField classes={{
                                                    "root": classes.inputAutoComplete
                                                }} size="small" type="number" variant="outlined" />
                                            </SectionSetting>
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
                    </CardContent>
                </TabPanel>

                <TabPanel value={this.state.tabIndex} index={1}>


                    <Demand />


>>>>>>> parent of 6e10fd6 (push)
                </TabPanel>

                <Divider />
            </Paper >
        );
    }
}

<<<<<<< HEAD
export default withStyles(styles, { withTheme: true })(SettingSchedule);
=======
export default withStyles(styles, { withTheme: true })(SettingSchedule);
>>>>>>> parent of 6e10fd6 (push)
