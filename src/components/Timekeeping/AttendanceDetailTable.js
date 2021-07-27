import React, { useState } from 'react';
import { IconButton, makeStyles, TableCell, TableRow, Paper, Collapse, Box, Typography, TableHead, TableBody, Table, TableContainer, Grid } from "@material-ui/core";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { countAttendances, getCountEarlyAndLately, getTotalHours, getTotalShift } from "./timekeeping.ultil";
import { format } from 'date-fns';
import { getHourDuration } from '../../ultis/scheduleHandle';
import clsx from 'clsx';
import CallReceivedIcon from '@material-ui/icons/CallReceived';
const useRowStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    cell: {
        borderBottom: "none"
    },
    cellTh: {
        borderBottomColor: "#90caf975"
    },
    rowCollapseForcus: {
        border: "#90caf92e"
    }
}));


export function AttendanceDetailTable(props) {

    const { user, skillSrc } = props;

    const classes = useRowStyles();

    // const totalHours = getTotalHours(user.attendances).toFixed(2);
    // const totalShifts = getTotalShift(user.attendances);
    // const count_Attendances = countAttendances(user.attendances);
    // const { comeLately, leaveEarly } = getCountEarlyAndLately(user.attendances);

    return (
        <React.Fragment>

            <TableContainer elevation={0}>
                <Table size="small" aria-label="purchases" >
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
                            }}>Check out Time</TableCell>
                            <TableCell classes={{
                                "root": classes.cellTh
                            }}>Check out Time</TableCell>
                            <TableCell classes={{
                                "root": classes.cellTh
                            }}>Woking Time(hrs)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {user.assignments.map((assignment) => {
                            let checkInTimeRender = "--:--";
                            let checkOutTimeRender = "--:--";
                            let timeDurationRender = 0;
                            if (assignment.shiftAttendance) {
                                checkInTimeRender = format(new Date(assignment.shiftAttendance.timeCheckIn), "HH:mm a");
                                checkOutTimeRender = format(new Date(assignment.shiftAttendance.timeCheckOut), "HH:mm a");
                                timeDurationRender = getHourDuration(assignment.shiftAttendance.timeCheckIn, assignment.shiftAttendance.timeCheckOut);
                            }
                            let timeStart = new Date(assignment.timeStart);
                            let dateRender = format(new Date(assignment.timeEnd), "dd/MM/yyyy");
                            let timeStartRender = format(new Date(assignment.timeStart), "HH:mm a");
                            let timeEndRender = format(new Date(assignment.timeEnd), "HH:mm a");
                            let skillRender = skillSrc?.find(skill => skill.id == assignment.skillId)?.name;

                            if (timeStart.getFullYear() <= 2000) {
                                timeStartRender = "--:--";
                                dateRender = "--:--";
                                timeEndRender = "--:--";
                            }

                            return (
                                <TableRow key={assignment.id} style={{
                                    borderBottom: "none"
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
                                        <Typography> {checkInTimeRender}</Typography>



                                    </TableCell>
                                    <TableCell component="td" scope="row" classes={{
                                        "root": classes.cell
                                    }}>
                                        {checkOutTimeRender}
                                    </TableCell>
                                    <TableCell classes={{
                                        "root": classes.cell
                                    }}> {timeDurationRender}</TableCell>

                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>);

}

