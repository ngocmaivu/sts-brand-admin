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


export function ShiftUserTable(props) {

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
                            }}>Start Time</TableCell>
                            <TableCell classes={{
                                "root": classes.cellTh
                            }}>Finish Time</TableCell>
                            <TableCell classes={{
                                "root": classes.cellTh
                            }}>Woking Time(hrs)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {user.attendances.map((attendance) => {
                            let timeStart = new Date(attendance.shiftAssignment.timeStart);
                            let dateRender = format(new Date(attendance.shiftAssignment.timeEnd), "dd/MM/yyyy");
                            let timeStartRender = format(new Date(attendance.shiftAssignment.timeStart), "HH:mm a");
                            let timeEndRender = format(new Date(attendance.shiftAssignment.timeEnd), "HH:mm a");
                            let skillRender = skillSrc?.find(skill => skill.id == attendance.shiftAssignment.skillId)?.name;

                            if (timeStart.getFullYear() <= 2000) {
                                timeStartRender = "--:--";
                                dateRender = "--:--";
                                timeEndRender = "--:--";
                            }

                            return (
                                <TableRow key={attendance.shiftAssignmentId} style={{
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
                                   <Typography> {timeStartRender}</Typography>



                                    </TableCell>
                                    <TableCell component="td" scope="row" classes={{
                                        "root": classes.cell
                                    }}>
                                        {timeEndRender}
                                    </TableCell>
                                    <TableCell classes={{
                                        "root": classes.cell
                                    }}> {getHourDuration(attendance.shiftAssignment.timeStart, attendance.shiftAssignment.timeEnd)}</TableCell>

                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>);

}

