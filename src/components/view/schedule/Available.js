import React from 'react';

import { createStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { CardContent, CardHeader, Divider, FormControl, FormLabel, Grid, Typography } from '@material-ui/core';
import WeekPicker from './WeekPicker';
import { format, isSameDay, startOfWeek, } from 'date-fns';
import { getStaffs, getShiftRegisterDatas, getWeekSchedule, } from '../../../_services';
import { getTotalHoursPerWeek } from '../../../ultis/scheduleHandle';
import { Skeleton } from '@material-ui/lab';


const styles = (Theme) => createStyles({
    container: {
        height: '100%'
    },
    containerContent: {
        padding: "20px 20px"
    },

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
        // ShiftRegisterData.find(shiftRegister.username == "").timeWorks.

        var staffs = await getStaffs();


        this.setState({
            staffs: staffs
        });


    }

    updateWeekScheuleId = async () => {
        const WeekSchedule = await getWeekSchedule(new Date(this.state.dateStart));

        if (!WeekSchedule) {
            console.log("GET WeekSchedule ERROR");
            return;
        }
        console.log(WeekSchedule.id);
        this.setState({ weekScheduleId: WeekSchedule.id });
    }

    updateShiftRegisterDatas = async () => {
        await this.updateWeekScheuleId();
        const shiftRegisterDatas = await getShiftRegisterDatas(this.state.weekScheduleId);

        // this.renderConstraintData(storeScheduleDetails);
        this.renderShiftRegisterDatas(shiftRegisterDatas);
    }

    renderShiftRegisterDatas = (shiftRegisterDatas) => {
        // staffs = staffs.map(staff =>
        // ({
        //     Name: `${staff.firstName} ${staff.lastName}`,
        //     Id: staff.username,
        //     shiftRegisters: ShiftRegisterData.find(shiftRegister.username == staff.username)
        // }));

        if (this.state.staffs) {
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
                console.log(shiftRegisterData.username);
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
        await this.loadData();
        await this.updateShiftRegisterDatas();
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (!isSameDay(prevState.dateStart, this.state.dateStart)) {
            this.setState({ shiftRegisterDatas: null });
            this.updateShiftRegisterDatas();
            // console.log(prevState.dateStart, this.state.dateStart);
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


        return (<div>
            <Paper className={this.props.classes.container}>
                <CardHeader title={
                    <Typography variant="h2">
                        Availability
                    </Typography>
                } disableTypography={false}
                />
                <Divider />
                <CardContent className={this.props.classes.containerContent}>
                    <FormControl margin="normal" variant="outlined" >
                        <FormLabel >Select Week</FormLabel>

                        <WeekPicker onChange={this.handleWeekChange} value={this.state.dateStart} />
                    </FormControl>
                    <TableContainer>
                        <Table aria-label="simple table" >
                            <TableHead>
                                <TableRow >
                                    <TableCell align="left" variant="head" >Username</TableCell>
                                    <TableCell align="center"><Typography variant="h4">Mon, {this.state.dateStart.getDate()}</Typography></TableCell>
                                    <TableCell align="center">Tue, {this.state.dateStart.getDate() + 1}</TableCell>
                                    <TableCell align="center">Wed, {this.state.dateStart.getDate() + 2}</TableCell>
                                    <TableCell align="center">Thu, {this.state.dateStart.getDate() + 3}</TableCell>
                                    <TableCell align="center">Fri, {this.state.dateStart.getDate() + 4}</TableCell>
                                    <TableCell align="center">Sat, {this.state.dateStart.getDate() + 5}</TableCell>
                                    <TableCell align="center">Sun, {this.state.dateStart.getDate() + 6}</TableCell>
                                </TableRow>
                            </TableHead>
                            {
                                this.state.shiftRegisterDatas ?
                                    (
                                        <TableBody>
                                            {
                                                this.renderAvailableRows()
                                            }
                                        </TableBody>
                                    )
                                    : (
                                        <Skeleton variant="rect"style={{ width: "100%", height: "700px" }} >
                                            <TableBody style={{ width: "100%", height: "700px" }}>


                                            </TableBody>
                                        </Skeleton>
                                    )
                            }

                        </Table>
                    </TableContainer>
                </CardContent>
            </Paper>
        </div >
        );
    }
}
export default withStyles(styles)(AvailablePage);