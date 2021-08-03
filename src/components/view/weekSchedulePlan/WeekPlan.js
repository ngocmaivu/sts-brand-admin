import React from 'react';
import { withRouter } from "react-router";
import { createStyles, withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import { Button, CardContent, CardHeader, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormLabel, Grid, IconButton, Tab, Tabs, TextField, Typography } from '@material-ui/core';
import { fetchWeekSchedule, fetchSkillSrc, fetchDefaultConfig } from "../../../_actions/";
import { format, isSameDay, startOfWeek, } from 'date-fns';
import { Skeleton } from '@material-ui/lab';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getWeekScheduleConstraint, postConstraint, updateConstraint, updateWeekScheduleName } from '../../../_services';
import SettingConstraintsForm from '../schedule/SettingConstraintsForm';
import { getConstraintDefault } from "../../../ultis/scheduleDefault";
import Demand from '../demand';
import Schedule from "../schedule";

import _ from "lodash";
import { addDays } from '@syncfusion/ej2-react-schedule';
import { EditOutlined } from '@material-ui/icons';
import EditWeekScheduleNameDialog from './EditWeekScheduleNameDialog';

const styles = (Theme) => createStyles({
    container: {
        height: '100%',
        padding: 16
    },
    containerContent: {
        padding: "20px 20px"
    },
});

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            style={{
                width: '100%', height: "85%",
                // display: value !== index ? "none" : null
            }}
        >

            {value === index && (
                <React.Fragment>
                    {children}
                </React.Fragment>
            )}

        </div >
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

class WeekPlan extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tabIndex: 0,
            openEditNameDialog: false,
            methodSubmitConstraint: null
        };
        this.props.fetchDefaultConfig();
    }

    componentDidMount = () => {
        this.fetchData();
        this.props.fetchSkillSrc();
    }


    componentDidUpdate = () => {

        if (!this.props.currentSchedule) {
            this.fetchData();
        }
    }

    fetchData = () => {

        let id = this.props.match.params.id;
        if (id && this.props.defaultConfig) {
            this.props.fetchWeekSchedule(id);
            this.renderConstraintData(id);
        }

    }

    renderConstraintData = async (weekScheduleId) => {
        const storeScheduleDetails = await getWeekScheduleConstraint(weekScheduleId);
        console.log(storeScheduleDetails);

        if (_.isEmpty(storeScheduleDetails)) {

            let constraints = this.props.defaultConfig.constraints;

            let id = this.props.match.params.id;
            constraints[0].weekScheduleId = id;
            constraints[1].weekScheduleId = id;
            await postConstraint(constraints);
            this.renderConstraintData(weekScheduleId);
        } else {
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
    onSubmitConstraints = async (constraintValues) => {
        console.log(constraintValues);
        console.log(this.state.constraintData);
        let id = this.props.match.params.id;

        constraintValues[0].weekScheduleId = id;
        constraintValues[0].minHoursPerDay = 0;
        constraintValues[1].minHoursPerDay = 0;
        constraintValues[1].weekScheduleId = id;

        await updateConstraint(constraintValues[0]);
        await updateConstraint(constraintValues[1]);

        await this.renderConstraintData(id);

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

    handleChange = (event, newValue) => {
        console.log(event);
        this.setState({ tabIndex: newValue });
    }
    renderEditNameDialog = () => {
        const handleClose = () => {
            this.setState({ openEditNameDialog: false });
        }

        return (
            <EditWeekScheduleNameDialog open={this.state.openEditNameDialog}
                handleClose={handleClose}
                nameValue={this.props.currentSchedule?.name}
                onSubmit={async (name) => {
                    console.log(name);
                    await updateWeekScheduleName(this.props.currentSchedule.id, name);
                    this.fetchData();
                    handleClose();

                }}
            />);
    }
    render() {
        return (<div>
            <Paper style={{ padding: 16, marginBottom: 16 }} elevation={0}>
                <CardHeader title={this.props.currentSchedule?.name} style={{ padding: 0 }} titleTypographyProps={{ variant: "h3" }}
                    action={<IconButton onClick={() => {
                        this.setState({ openEditNameDialog: true });
                    }}><EditOutlined color="primary" /></IconButton>} />
                <Typography variant="h3">
                    Week: {this.props.currentSchedule ?
                        `${format(new Date(this.props.currentSchedule.dateStart), "dd/MM/yyyy")} - ${format(addDays(new Date(this.props.currentSchedule.dateStart), 6), "dd/MM/yyyy")}` : null}
                </Typography>
            </Paper>

            <Paper className={this.props.classes.container}>
                <Tabs
                    value={this.state.tabIndex}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={this.handleChange}
                >
                    <Tab label="Constraints " value={0} />
                    <Tab label="Demands" value={1} />
                    <Tab label="View" value={2} />
                </Tabs>
                <Divider />
                <TabPanel value={this.state.tabIndex} index={0}>
                    {
                        this.state.constraintData ? (
                            <SettingConstraintsForm initialValues={this.state.constraintData} onSubmit={this.onSubmitConstraints} />
                        ) : "...Loading"
                    }
                </TabPanel>
                <TabPanel value={this.state.tabIndex} index={1}>
                    {
                        this.props.currentSchedule ? (
                            <Demand dateStart={this.props.currentSchedule.dateStart} weekScheduleId={this.props.currentSchedule.id} />
                        ) : "...Loading"
                    }

                </TabPanel>
                <TabPanel value={this.state.tabIndex} index={2}>
                    {
                        this.props.currentSchedule ? (
                            <Schedule dateStart={this.props.currentSchedule.dateStart} weekScheduleId={this.props.currentSchedule.id}
                                refreshSchedule={() => {
                                    this.fetchData();
                                }} />
                        ) : "...Loading"
                    }
                </TabPanel>
            </Paper>
            {this.renderEditNameDialog()}
        </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentSchedule: state.schedule.currentSchedule,
        skillSrc: state.schedule.skillSrc,
        defaultConfig: state.schedule.defaultConfig
    }
}
export default connect(
    mapStateToProps,
    {
        fetchWeekSchedule,
        fetchSkillSrc,
        fetchDefaultConfig
    }
)(withRouter(withStyles(styles)(WeekPlan)));