import React, { useState } from 'react';
import { IconButton, makeStyles, TableCell, TableRow, Paper, Collapse, Box, Typography, TableHead, TableBody, Table, TableContainer, Grid } from "@material-ui/core";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
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
        if (timeWork.shiftAssignment[timeStartKey] && timeWork.shiftAssignment[timeEndKey]) {
            let duration = intervalToDuration({
                start: new Date(timeWork.shiftAssignment[timeStartKey]),
                end: new Date(timeWork.shiftAssignment[timeEndKey])
            });

            totalMinutesPerWeek += duration.hours * 60 + duration.minutes;
        }

    });

    return totalMinutesPerWeek / 60;
}

export function TimeKeepingRow(props) {

    const { user, onRowClick, index } = props;
    const classes = useRowStyles();
    const totalHours = getTotalHours(user.attendances, 'timeStart', "timeEnd").toFixed(2);
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
        </TableRow>
    );

}
