import React, { useState } from 'react';
import { IconButton, makeStyles, TableCell, TableRow, Paper, Collapse, Box, Typography, TableHead, TableBody, Table, TableContainer, Grid } from "@material-ui/core";

import { countAttendances, getCountEarlyAndLately, getTotalShift } from "./timekeeping.ultil";
import { format, intervalToDuration } from 'date-fns';
import { getHourDuration, getTotalHoursPerWeek } from '../../ultis/scheduleHandle';
import clsx from 'clsx';
import CallReceivedIcon from '@material-ui/icons/CallReceived';
const useRowStyles = makeStyles(theme => ({
    root: {
        '& > *': {

        },
        "&:hover": {
            cursor: "pointer"
        }
    },
    cell: {

    },
    cellTh: {
        borderBottomColor: "#90caf975"
    },

}));



export function AttendanceRow(props) {

    const { user, onRowClick, index } = props;
    const classes = useRowStyles();
    const totalHours = getTotalHoursPerWeek(user.assignments, 'timeCheckIn', "timeCheckOut").toFixed(2);
    const totalShifts = getTotalShift(user.assignments);
    const count_Attendances = countAttendances(user.assignments);
    const { comeLately, leaveEarly } = getCountEarlyAndLately(user.assignments);

    return (

        <TableRow key={user.username} hover className={classes.root} onClick={() => onRowClick()}>
            <TableCell align="left" variant="head" >{index + 1}</TableCell>
            <TableCell align="left" variant="head" >{user.username}</TableCell>
            <TableCell align="left" variant="head" >{`${user.firstName} ${user.lastName}`}</TableCell>
            <TableCell align="center" variant="head">{totalShifts}</TableCell>
            <TableCell align="center" variant="head">{totalHours}</TableCell>
            <TableCell align="center" variant="head">{totalShifts - count_Attendances}</TableCell>
            <TableCell align="center" variant="head">{comeLately}</TableCell>
            <TableCell align="center" variant="head">{leaveEarly}</TableCell>
        </TableRow>
    );

}

