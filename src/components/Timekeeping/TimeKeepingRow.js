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

// "username": "luffy007",
// "firstName": "Monkey D",
// "lastName": "Luffy",
// "assignments": [
//     {
//         "id": 6,
//         "username": "luffy007",
//         "storeId": 55,
//         "skillId": 20,
//         "timeStart": "2021-07-31T07:00:55.6",
//         "timeEnd": "2021-07-31T12:00:55.6",
//         "shiftAttendance": null,
//         "referenceId": 0
//     },
export function TimeKeepingRow(props) {

    const { user, onRowClick, index } = props;
    const classes = useRowStyles();
    const totalHours = getTotalHours(user.assignments, 'timeStart', "timeEnd").toFixed(2);
    const totalShifts = user.assignments.length;
    const count_Attendances = countAttendances(user.assignments);


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

