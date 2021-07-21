import React, { useState } from 'react';
import { IconButton, makeStyles, TableCell, TableRow, Paper, Collapse, Box, Typography, TableHead, TableBody, Table, TableContainer, Grid } from "@material-ui/core";

import { countAttendances, getCountEarlyAndLately, getTotalShift } from "./timekeeping.ultil";
import { format, intervalToDuration } from 'date-fns';
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


function getTotalHours(timeWorks, timeStartKey, timeEndKey) {
    let totalMinutesPerWeek = 0;

    timeWorks.forEach(timeWork => {
        if (timeWork[timeStartKey] && timeWork[timeEndKey]) {
            let duration = intervalToDuration({
                start: new Date(timeWork[timeStartKey]),
                end: new Date(timeWork[timeEndKey])
            });

            totalMinutesPerWeek += duration.hours * 60 + duration.minutes;
        }

    });

    return totalMinutesPerWeek / 60;
}

export function AttendanceRow(props) {

    const { user, onRowClick, index } = props;
    const classes = useRowStyles();
    const totalHours = getTotalHours(user.attendances, 'timeCheckIn', "timeCheckOut").toFixed(2);
    const totalShifts = getTotalShift(user.attendances);
    const count_Attendances = countAttendances(user.attendances);
    const { comeLately, leaveEarly } = getCountEarlyAndLately(user.attendances);

    return (

        <TableRow key={user.username} hover className={classes.root} onClick={() => onRowClick()}>
            <TableCell align="left" variant="head" >{index + 1}</TableCell>
            <TableCell align="left" variant="head" >{user.username}</TableCell>
            <TableCell align="left" variant="head" >{`${user.firstName} ${user.lastName}`}</TableCell>
            <TableCell align="center">{totalHours}</TableCell>
            <TableCell align="center">{totalShifts}</TableCell>
            <TableCell align="center">{count_Attendances}</TableCell>
            <TableCell align="center">{comeLately}</TableCell>
            <TableCell align="center">{leaveEarly}</TableCell>
        </TableRow>
    );

}

