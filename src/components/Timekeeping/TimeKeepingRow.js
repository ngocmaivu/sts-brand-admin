import React, { useState } from 'react';
import { IconButton, makeStyles, TableCell, TableRow, Collapse, Box,Typography, TableHead, TableBody, Table } from "@material-ui/core";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { countAttendances, getCountEarlyAndLately, getTotalHours, getTotalShift } from "./timekeeping.ultil";

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});




export function TimeKeepingRow(props) {

    const { user } = props;
    const [open, setOpen] = useState(false);
    const classes = useRowStyles();

    const totalHours = getTotalHours(user.attendances).toFixed(2);
    const totalShifts = getTotalShift(user.attendances);
    const count_Attendances = countAttendances(user.attendances);
    const { comeLately, leaveEarly } = getCountEarlyAndLately(user.attendances);

    return (
        <React.Fragment>
            <TableRow key={user.username} hover className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell align="left" variant="head" >{user.username}</TableCell>
                <TableCell align="left" variant="head" >{`${user.firstName} ${user.lastName}`}</TableCell>
                <TableCell align="center">{totalHours}</TableCell>
                <TableCell align="center">{totalShifts}</TableCell>
                <TableCell align="center">{count_Attendances}</TableCell>
                <TableCell align="center">{comeLately}</TableCell>
                <TableCell align="center">{leaveEarly}</TableCell>
                <TableCell align="center"></TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Attandance Details
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Customer</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                        <TableCell align="right">Total price ($)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {user.attendances.map((attendance) => (
                                        <TableRow key={attendance.shiftAssignmentId}>
                                            <TableCell component="th" scope="row">
                                                {attendance.timeCheckIn}
                                            </TableCell>
                                            <TableCell> {attendance.timeCheckOut}</TableCell>
                                            <TableCell align="right">0</TableCell>
                                            <TableCell align="right">
                                                {0}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>);

}

