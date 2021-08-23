import React from 'react';

import { createStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Box, Button, Card, CardContent, CardHeader, Divider, FormControl, FormLabel, Grid, Typography } from '@material-ui/core';
import WeekPicker from '../../WeekPicker';
import { format, isSameDay, startOfWeek, } from 'date-fns';
import { getStaffs, getShiftRegisterDatas, getWeekSchedule, } from '../../../_services';
import { getTotalHoursPerWeek } from '../../../ultis/scheduleHandle';
import { Skeleton } from '@material-ui/lab';
import { fetchWeekSchedules } from "../../../_actions/";
import { connect } from 'react-redux';
import _ from 'lodash';
import addDays from 'date-fns/addDays';

const styles = (Theme) => createStyles({
    container: {
        height: '100%'
    },
    containerContent: {
        padding: "20px 20px"
    },
    cell: {
        border: "1px solid #e0e0e0",
    }

});
class AvailablePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dateStart: startOfWeek(new Date(), {
                weekStartsOn: 1
            }),
            weekScheduleId: null,
            constraintData: null,
            staffs: null,
            tabIndex: 0
        };
    }

    loadData = async () => {
        var staffs = await getStaffs();

        this.setState({
            staffs: staffs
        });
    }

    updateShiftRegisterDatas = async () => {
        console.log(this.props.weekSchedules[0]);
        const shiftRegisterDatas = await getShiftRegisterDatas(this.props.weekSchedules[0].id);
        this.renderShiftRegisterDatas(shiftRegisterDatas);
    }

    renderShiftRegisterDatas = (shiftRegisterDatas) => {

        if (this.state.staffs) {
            if (shiftRegisterDatas)
                this.setState({
                    shiftRegisterDatas: this.state.staffs.map(staff => {
                        return {
                            fullname: `${staff.firstName} ${staff.lastName}`,
                            username: staff.username,
                            timeWorks: shiftRegisterDatas.filter(
                                shiftRegister => shiftRegister.username == staff.username
                            ).map(({ id, timeStart, timeEnd }) => ({
                                id, timeStart, timeEnd
                            }))
                        }
                    })
                })
        }
    }

    renderAvailableRows = () => {
        var days = [1, 2, 3, 4, 5, 6, 0];
        var formatPattern = "HH:mm";

        return this.state.shiftRegisterDatas.map(
            shiftRegisterData => {
                let totalHoursPerWeek = getTotalHoursPerWeek(shiftRegisterData.timeWorks, "timeStart", "timeEnd");
                return (
                    <TableRow key={shiftRegisterData.username} style={{ height: 88 }}>
                        <TableCell align="left" variant="body" style={{ verticalAlign: 'top' }}>
                            <Grid container direction="column">
                                <Grid item>
                                    <Typography variant="subtitle1">{shiftRegisterData.fullname}</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle2">{`${totalHoursPerWeek} hrs`}</Typography>
                                </Grid>
                            </Grid>
                        </TableCell>
                        {
                            days.map((day) => (
                                <TableCell key={`${day}`} align="center" style={{ verticalAlign: 'top' }}>
                                    <Grid container direction="column">
                                        {
                                            shiftRegisterData.timeWorks.filter(
                                                timeWork => {
                                                    var date = new Date(timeWork.timeStart);
                                                    return date.getDay() == day
                                                }
                                            ).map((timeWork, index) => ((
                                                <Grid item key={index}>
                                                    <Typography variant="subtitle1" gutterBottom>
                                                        {`${format(new Date(timeWork.timeStart), formatPattern)} - 
                                            ${format(new Date(timeWork.timeEnd), formatPattern)}`}</Typography>
                                                </Grid>)
                                            ))
                                        }
                                    </Grid>
                                </TableCell>
                            ))
                        }
                    </TableRow >
                );
            }
        )



    }

    componentDidMount = async () => {
        console.log(this.state.dateStart);
        this.props.fetchWeekSchedules(this.state.dateStart);
        await this.loadData();
        if (this.props.weekSchedules) {
            await this.updateShiftRegisterDatas();
        }

    }

    componentDidUpdate = async (prevProps, prevState, snapshot) => {
        if (!isSameDay(prevState.dateStart, this.state.dateStart)) {
            console.log(this.state.dateStart);
            this.props.fetchWeekSchedules(this.state.dateStart);

            // console.log(prevState.dateStart, this.state.dateStart);
        }
        if (prevProps.weekSchedules && this.props.weekSchedules)
            if (prevProps.weekSchedules[0].id != this.props.weekSchedules[0].id) {
                this.updateShiftRegisterDatas();
            }

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

    render() {


        return (<React.Fragment>
            <Card style={{ padding: '12px', paddingLeft: 18, marginBottom: '16px' }} elevation={0}>
                <Typography variant="h3">Availability</Typography>
                <Box height={16}></Box>
                <Grid container direction="row" justify="space-between" alignItems="center">
                    <Grid item container direction="row" justify="flex-start" alignItems="center" spacing={4} xs={7}>
                        <Grid item >
                            <Typography variant="subtitle1">Select Week</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <FormControl margin="normal" variant="outlined" >
                                <WeekPicker onChange={this.handleWeekChange} value={this.state.dateStart} />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item>
                        {/* <Button color="primary" variant="outlined" >Add manually</Button> */}
                    </Grid>
                </Grid>

            </Card>
            <Paper className={this.props.classes.container} style={{ height: "75vh" }}>

                <CardContent className={this.props.classes.containerContent} style={{ height: "100%" }}>

                    <TableContainer style={{ height: "100%" }}>
                        <Table aria-label="simple table" stickyHeader>
                            <TableHead >
                                <TableRow >
                                    <TableCell align="left" variant="head" ><Typography variant="h4">Username</Typography></TableCell>
                                    <TableCell align="center"><Typography variant="h4">{format(this.state.dateStart, "EE dd")}</Typography></TableCell>
                                    <TableCell align="center"><Typography variant="h4">{format(addDays(this.state.dateStart, 1), "EE dd")}</Typography></TableCell>
                                    <TableCell align="center"><Typography variant="h4">{format(addDays(this.state.dateStart, 2), "EE dd")}</Typography></TableCell>
                                    <TableCell align="center"><Typography variant="h4">{format(addDays(this.state.dateStart, 3), "EE dd")}</Typography></TableCell>
                                    <TableCell align="center"><Typography variant="h4">{format(addDays(this.state.dateStart, 4), "EE dd")}</Typography></TableCell>
                                    <TableCell align="center"><Typography variant="h4">{format(addDays(this.state.dateStart, 5), "EE dd")}</Typography></TableCell>
                                    <TableCell align="center"><Typography variant="h4">{format(addDays(this.state.dateStart, 6), "EE dd")}</Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.shiftRegisterDatas ?



                                        this.renderAvailableRows()



                                        : (

                                            <TableRow>
                                                <TableCell colSpan={8} >
                                                    <Grid container spacing={2} direction="column" >
                                                        <Grid item xs>
                                                            <Skeleton animation="wave" variant="rect" height="175px" />
                                                        </Grid>
                                                        <Grid item xs>
                                                            <Skeleton animation="wave" variant="rect" height="120px" />
                                                        </Grid>
                                                        <Grid item xs>
                                                            <Skeleton animation="wave" variant="rect" height="70px" />
                                                        </Grid>
                                                        <Grid item xs>
                                                            <Skeleton animation="wave" variant="rect" height="40px" />
                                                        </Grid>
                                                        <Grid item xs>
                                                            <Skeleton animation="wave" variant="rect" height="20px" />
                                                        </Grid>
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>

                                        )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Paper>
        </React.Fragment >
        );
    }
}
const mapStateToProps = (state) => {
    return {
        weekSchedules: state.schedule.weekSchedules,
    }
}
export default connect(
    mapStateToProps, {
    fetchWeekSchedules
}
)(withStyles(styles)(AvailablePage));