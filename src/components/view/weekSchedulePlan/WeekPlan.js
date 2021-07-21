import React from 'react';
import { withRouter } from "react-router";
import { createStyles, withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import { Button, CardContent, CardHeader, Chip, Divider, FormControl, FormLabel, Grid, IconButton, Tab, Tabs, Typography } from '@material-ui/core';
import { fetchWeekSchedule } from "../../../_actions/";
import { format, isSameDay, startOfWeek, } from 'date-fns';
import { Skeleton } from '@material-ui/lab';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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

class WeekPlan extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dateStart: startOfWeek(new Date(), {
                weekStartsOn: 1
            }),
            weekScheduleId: null,
            tabIndex: 0,

        };
    }

    componentDidMount = () => {
        let id = this.props.match.params.id;
        this.props.fetchWeekSchedule(id);
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

    render() {
        return (<div>
            <Paper style={{ padding: 16, marginBottom: 16 }} elevation={0}>
                <Typography variant="h3">
                    Schedule Plan Name
                </Typography>
                <Typography variant="h3">
                    Week:
                </Typography>
            </Paper>

            <Paper className={this.props.classes.container}>
                <Tabs
                    value={this.state.tabIndex}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={this.handleChange}
                    aria-label="disabled tabs example"

                >
                    <Tab label="Constraints " value={0} />
                    <Tab label="Demands" value={1} />
                    <Tab label="View" value={2} />
                </Tabs>
                <Divider />
                <TabPanel value={this.state.tabIndex} index={0}>

                </TabPanel>

                <TabPanel value={this.state.tabIndex} index={1}>

                </TabPanel>
                <TabPanel value={this.state.tabIndex} index={2}>

                </TabPanel>
            </Paper>
        </div >
        );
    }
}
const mapStateToProps = (state) => {
    return {
        currentSchedule: state.schedule.currentSchedule
    }
}
export default connect(
    mapStateToProps,
    {
        fetchWeekSchedule
    }
)(withRouter(withStyles(styles)(WeekPlan)));