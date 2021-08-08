import React from 'react';
import { withRouter } from "react-router";
import { createStyles, withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardContent, CardHeader, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormLabel, Grid, IconButton, Tab, Tabs, TextField, Typography } from '@material-ui/core';
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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import _ from "lodash";
import { addDays } from '@syncfusion/ej2-react-schedule';
import { EditOutlined } from '@material-ui/icons';
import EditWeekScheduleNameDialog from './EditWeekScheduleNameDialog';

const styles = (Theme) => createStyles({
    container: {
        height: '100%',
        padding: 12,

    },
    containerContent: {
        padding: "16px 16px"
    },
    tabsStyled: {
        // "& .MuiTabs-indicator": {
        //     display: "none"
        // }
    },
    tabStyled: {
        backgroundColor: "#fff",

        marginRight: 12,
        "& .MuiTab-selected": {
            backgroundColor: Theme.palette.primary.main
        }
    },
    tabsInputStyled: {
        borderRight: `1px solid ${Theme.palette.divider}`,
        height: "70vh"
    }
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
                width: '100%',
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
            tabInputIndex: 0,
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

    handleTabInputChange = (event, newValue) => {
        this.setState({ tabInputIndex: newValue });
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
            <Paper style={{ paddingTop: 16, paddingLeft: 16, marginBottom: 8 }} elevation={0}>
                <CardHeader title={this.props.currentSchedule?.name}
                    subheader={
                        this.props.currentSchedule ?
                            `${format(new Date(this.props.currentSchedule.dateStart), "dd/MM/yyyy")} - ${format(addDays(new Date(this.props.currentSchedule.dateStart), 6), "dd/MM/yyyy")}` : ""
                    }
                    style={{ padding: 0 }} titleTypographyProps={{ variant: "h3" }}
                    action={<IconButton onClick={() => {
                        this.setState({ openEditNameDialog: true });
                    }}><EditOutlined color="primary" /></IconButton>} />
                <Tabs
                    value={this.state.tabIndex}
                    indicatorColor="primary"
                    textColor="primary"
                    className={this.props.classes.tabsStyled}
                    onChange={this.handleChange}
                >
                    <Tab label="Config" value={0} className={this.props.classes.tabStyled} />
                    <Tab label="Result" value={1} className={this.props.classes.tabStyled} />
                </Tabs>
            </Paper>



            {/* <Box height={12} /> */}

            <TabPanel value={this.state.tabIndex} index={0}>
                <Card style={{
                    paddingTop: 8,

                    flexGrow: 1,
                }}>
                    <Grid container spacing={1} direction="row">
                        <Grid item style={{width: 200}} >
                            <Tabs
                                value={this.state.tabInputIndex}
                                indicatorColor="primary"
                                orientation="vertical"
                                textColor="primary"
                                className={this.props.classes.tabsInputStyled}

                                onChange={this.handleTabInputChange}
                            >
                                <Tab label="Constraints" value={0} />
                                <Tab label="Demand" value={1} />
                            </Tabs>
                        </Grid>
                        <Grid item  zeroMinWidth style={{ flexBasis: 0, flexGrow: 1, padding: 12 }}>
                            <TabPanel value={this.state.tabInputIndex} index={0}>

                                {
                                    this.state.constraintData ? (
                                        <SettingConstraintsForm initialValues={this.state.constraintData} onSubmit={this.onSubmitConstraints} />
                                    ) : "...Loading"
                                }   </TabPanel>
                            <TabPanel value={this.state.tabInputIndex} index={1}>
                                {
                                    this.props.currentSchedule ? (
                                        <Demand dateStart={this.props.currentSchedule.dateStart} weekScheduleId={this.props.currentSchedule.id} />
                                    ) : "...Loading"
                                }
                            </TabPanel>

                        </Grid>
                    </Grid>
                </Card>
            </TabPanel>
            <TabPanel value={this.state.tabIndex} index={1}>

                {
                    this.props.currentSchedule ? (
                        <Schedule dateStart={this.props.currentSchedule.dateStart} weekScheduleId={this.props.currentSchedule.id}
                            refreshSchedule={() => {
                                this.fetchData();
                            }} />
                    ) : "...Loading"
                }

            </TabPanel>

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