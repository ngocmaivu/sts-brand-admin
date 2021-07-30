import React, { useState } from 'react';
import { IconButton, makeStyles, TableCell, TableRow, Paper, Collapse, Box, Typography, TableHead, TableBody, Table, TableContainer, Grid } from "@material-ui/core";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { checkComeLateLy, checkLeaveEarly, countAttendances, getCountEarlyAndLately, getTotalHours, getTotalShift } from "./timekeeping.ultil";
import { format, intervalToDuration } from 'date-fns';
import { getHourDuration } from '../../ultis/scheduleHandle';
import clsx from 'clsx';
import CallReceivedIcon from '@material-ui/icons/CallReceived';
import isSameDay from 'date-fns/isSameDay';

const useRowStyles = makeStyles(theme => ({
    root: {
        '& > *': {

        },
    },
    cell: {
       
    },
    cellTh: {
        borderBottomColor: "#90caf975"
    },
    rowCollapseForcus: {
        border: "#90caf92e"
    },
    okTypography: {
        color: "#28d144"
    },
    notOkTypography: {
        color: "#fc291d"
    }
}));

function format2Digit(number) {
    return number.toLocaleString('en-US', { minimumIntegerDigits: 2 });
}

export function AttendanceDetailTable(props) {

    const { user, skillSrc } = props;

    const classes = useRowStyles();

    const renderWorkingHour = (checkInTime, checkOutTime, timeStart, timeEnd) => {
        let durationReal = intervalToDuration({
            start: checkInTime,
            end: checkOutTime
        });
        let durationPlan = intervalToDuration({
            start: timeStart,
            end: timeEnd
        });

        let resultReal = durationReal.hours * 60 + durationReal.minutes;
        let resultPlan = durationPlan.hours * 60 + durationPlan.minutes;
        let text = `${format2Digit(durationReal.hours)}h${format2Digit(durationReal.minutes)}m / ${format2Digit(durationPlan.hours)}h${format2Digit(durationPlan.minutes)}m`;

        if (resultReal >= resultPlan) {
            return (<Typography className={classes.okTypography} variant="subtitle1">{text}</Typography>)
        } else {
            return (<Typography variant="subtitle1" className={classes.notOkTypography}>{text}</Typography>);
        }
    }

    const renderReal = (checkInTime, checkOutTime, timeStart, timeEnd) => {

        let durationReal = intervalToDuration({
            start: checkInTime,
            end: checkOutTime
        });
        let durationPlan = intervalToDuration({
            start: timeStart,
            end: timeEnd
        });

        let resultReal = durationReal.hours * 60 + durationReal.minutes;
        let resultPlan = durationPlan.hours * 60 + durationPlan.minutes;
        let text = `${format2Digit(durationReal.hours)}h${format2Digit(durationReal.minutes)}m`;

        if (resultReal >= resultPlan) {
            return (<Typography className={classes.okTypography} variant="subtitle1">{text}</Typography>)
        } else {
            return (<Typography variant="subtitle1" className={classes.notOkTypography}>{text}</Typography>);
        }

    }

    const renderEstimate = (timeStart, timeEnd) => {

        let durationPlan = intervalToDuration({
            start: timeStart,
            end: timeEnd
        });

        return (<Typography variant="subtitle1">{`${format2Digit(durationPlan.hours)}h${format2Digit(durationPlan.minutes)}m`}</Typography>)

    }

    return (
        <React.Fragment>

            <TableContainer elevation={0}>
                <Table aria-label="purchases" >
                    <TableHead >
                        <TableRow >
                            <TableCell classes={{
                                "root": classes.cellTh
                            }} >Date</TableCell>
                            <TableCell classes={{
                                "root": classes.cellTh
                            }}>Area</TableCell>
                            <TableCell classes={{
                                "root": classes.cellTh
                            }}>Time Start</TableCell>
                            <TableCell classes={{
                                "root": classes.cellTh
                            }}>Time End</TableCell>
                            <TableCell classes={{
                                "root": classes.cellTh
                            }}>Estimate(hrs)</TableCell>
                            <TableCell classes={{
                                "root": classes.cellTh
                            }}>Check in Time</TableCell>
                            <TableCell classes={{
                                "root": classes.cellTh
                            }}>Check out Time</TableCell>
                            <TableCell classes={{
                                "root": classes.cellTh
                            }}>Real working time(hrs)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {user.assignments.map((assignment) => {

                            let timeStart = new Date(assignment.timeStart);
                            let timeEnd = new Date(assignment.timeEnd);
                            let checkInTime = new Date(assignment.timeCheckIn);
                            let checkOutTime = new Date(assignment.timeCheckOut);


                            let checkInTimeRender = "--:--";
                            if (isSameDay(timeStart, checkInTime)) {
                                if (!checkComeLateLy(checkInTime, timeStart)) {
                                    checkInTimeRender = (
                                        <Typography variant="subtitle1" className={classes.okTypography}>{format(new Date(checkInTime), "HH:mm a")}</Typography>
                                    );
                                } else {
                                    checkInTimeRender = (<Typography variant="subtitle1" className={classes.notOkTypography}>{format(new Date(checkInTime), "HH:mm a")}</Typography>);
                                }
                            }

                            let checkOutTimeRender = "--:--";
                            if (isSameDay(timeEnd, checkOutTime)) {
                                if (!checkLeaveEarly(checkOutTime, timeEnd)) {
                                    checkOutTimeRender = (
                                        <Typography variant="subtitle1" className={classes.okTypography}>{format(new Date(checkOutTime), "HH:mm a")}</Typography>
                                    );
                                } else {
                                    checkOutTimeRender = (
                                        <Typography variant="subtitle1" className={classes.notOkTypography}>{format(new Date(checkOutTime), "HH:mm a")}</Typography>
                                    );

                                }
                            }

                            let timeDurationRender = renderWorkingHour(checkInTime, checkOutTime, timeStart, timeEnd);
                            let timePlans = renderEstimate(timeStart, timeEnd);
                            let timeReals = renderReal(checkInTime, checkOutTime, timeStart, timeEnd);
                            let dateRender = (
                                <Typography variant="subtitle1" >{format(new Date(timeStart), "EEE dd MMM yyy")}</Typography>
                            );
                            let timeStartRender = (
                                <Typography variant="subtitle1" >{format(timeStart, "HH:mm a")}</Typography>
                            );
                            let timeEndRender = (
                                <Typography variant="subtitle1" >{format(timeEnd, "HH:mm a")}</Typography>
                            );

                            let skillRender = (
                                <Typography variant="subtitle1" >{skillSrc?.find(skill => skill.id == assignment.skillId)?.name}</Typography>
                            );


                            return (
                                <TableRow key={assignment.id} hover className={classes.root} style={{

                                }}>
                                    <TableCell component="td" scope="row" classes={{
                                        "root": classes.cell
                                    }}>
                                        {dateRender}
                                    </TableCell>
                                    <TableCell component="td" scope="row" classes={{
                                        "root": classes.cell
                                    }}>
                                        {skillRender}
                                    </TableCell>
                                    <TableCell component="td" scope="row" classes={{
                                        "root": classes.cell
                                    }}>
                                        <Typography> {timeStartRender}</Typography>



                                    </TableCell>
                                    <TableCell component="td" scope="row" classes={{
                                        "root": classes.cell
                                    }}>
                                        {timeEndRender}
                                    </TableCell>
                                    <TableCell classes={{
                                        "root": classes.cell
                                    }}> {timePlans}</TableCell>

                                    <TableCell component="td" scope="row" classes={{
                                        "root": classes.cell
                                    }}>
                                        <Typography> {checkInTimeRender}</Typography>



                                    </TableCell>
                                    <TableCell component="td" scope="row" classes={{
                                        "root": classes.cell
                                    }}>
                                        {checkOutTimeRender}
                                    </TableCell>
                                    <TableCell classes={{
                                        "root": classes.cell
                                    }}> {timeReals}</TableCell>

                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>);

}

