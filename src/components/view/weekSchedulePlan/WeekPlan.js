import React from 'react';
import { withRouter } from "react-router";
import { createStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, CardContent, CardHeader, Chip, Divider, FormControl, FormLabel, Grid, IconButton, Tab, Tabs, Typography } from '@material-ui/core';
import WeekPicker from '../../WeekPicker';
import { format, isSameDay, startOfWeek, } from 'date-fns';
import { getStaffs, getShiftRegisterDatas, getWeekSchedule, } from '../../../_services';
import { getTotalHoursPerWeek } from '../../../ultis/scheduleHandle';
import { Skeleton } from '@material-ui/lab';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
const styles = (Theme) => createStyles({
    container: {
        height: '100%',
        padding: 16
    },
    containerContent: {
        padding: "20px 20px"
    },

});

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
            <Paper style={{ padding: 16, marginBottom: 32 }} elevation={0}>
                <Typography variant="h2">
                    Schedule Plan Name
                </Typography>
                <Typography variant="h2">
                    Week:
                </Typography>
            </Paper>

            <Paper className={this.props.classes.container}>

                {/* <Typography variant="h4">{this.getTitleHeader()} </Typography> */}
                <Divider />
                <CardContent className={this.props.classes.containerContent}>


                </CardContent>
            </Paper>
        </div >
        );
    }
}
export default withRouter(withStyles(styles)(WeekPlan));