import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { connect } from 'react-redux';
import { Button, createStyles, Dialog, DialogContent, TableCell, DialogContentText, DialogTitle, DialogActions, InputAdornment, TextField, withStyles, Paper, Card, Grid, TableContainer, Table, TableHead, TableRow, TableBody, IconButton, Collapse, Typography, FormControl, FormLabel, Box } from '@material-ui/core';

import MuiAlert from '@material-ui/lab/Alert';
import { Delete, Edit, ImageSearch, ImageSearchTwoTone, SearchTwoTone, ViewAgenda, ViewStreamOutlined, VisibilityOutlined } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import { DateRangePicker, DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import { TimeKeepingRow } from './TimeKeepingRow';
import { loadSkills, fetchTimeKeeping, calculateTimeKeeping } from "../../_services";
import { ShiftUserTable } from './ShiftUserTable';
import addDays from 'date-fns/addDays';
import { getFirstDayOfWeek } from "../../ultis/scheduleHandle";
import { toDate } from 'date-fns';
import { AttendanceDetailTable } from './AttendanceDetailTable';
import { AttendanceRow } from './AttendanceRow';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const styles = (Theme) => createStyles({
    root: {
        '& .header-table': {
            backgroundColor: 'rgba(255, 7, 0, 0.55)',
        },
    },

    button: {
        minWidth: 46,
        fontSize: '1em',
        padding: 0,
        marginRight: 5,
        '&:hover': {
            boxShadow: 'none',
        },
    },
    deleteButton: {
        color: "#FA0000",
        borderColor: '#fa000080',
    },
    searchButton: {
        borderColor: Theme.palette.primary.main,
        borderWidth: 1,
        color: Theme.palette.primary.main,
        backgroundColor: Theme.palette.common.white,
        fontWeight: 500,
        height: '2.7em',
        // padding: '10px 30px',
        textAlign: 'center',
        '&:hover': {
            color: "#FFFFFF",
            backgroundColor: Theme.palette.primary.main,
            // borderColor: '#FFFFFF',
            boxShadow: 'none',
        },

    },
    searchInput: {
        height: '3em',
        width: '40%',
        '& input': {
            padding: '13px 10px',
        }
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        // width: '100%',
        marginBottom: '0.5em',
        padding: '5px 12px'
    },
    container: {
        padding: 20
    },
    theadCell: {

    }
});

const dataSrc = [
    {
        username: "lycuong99",
        firstName: "Ly",
        lastName: "Cuong",
        attendances: [
            {
                shiftAssignmentId: 1,
                timeCheckIn: "2021-07-13T08:04:34",
                timeCheckOut: "2021-07-13T17:04:34",
                shiftAssignment: {
                    id: 1,
                    timeStart: "2021-07-13T08:00:34",
                    timeEnd: "2021-07-13T17:00:34",
                    skillId: 18,
                }
            },
            {
                shiftAssignmentId: 2,
                timeCheckIn: "2021-07-14T08:00:34",
                timeCheckOut: "2021-07-14T16:59:34",
                shiftAssignment: {
                    id: 2,
                    timeStart: "2021-07-14T08:00:34",
                    timeEnd: "2021-07-13T17:00:34",
                    skillId: 18,
                }
            },
            {
                shiftAssignmentId: 3,
                timeCheckIn: "2021-07-15T08:00:34",
                timeCheckOut: "2021-07-15T17:10:34",
                shiftAssignment: {
                    id: 3,
                    timeStart: "2021-07-15T08:00:34",
                    timeEnd: "2021-07-15T17:00:34",
                    skillId: 18,
                }
            },
            {
                shiftAssignmentId: 4,
                timeCheckIn: null,
                timeCheckOut: null,
                shiftAssignment: {
                    id: 5,
                    timeStart: "2021-07-15T08:00:34",
                    timeEnd: "2021-07-15T17:00:34",
                    skillId: 18,
                }
            },
            {
                shiftAssignmentId: 5,
                timeCheckIn: "2021-07-16T08:00:34",
                timeCheckOut: "2021-07-16T16:59:34",
                shiftAssignment: {
                    id: 5,
                    timeStart: "2021-07-16T08:00:34",
                    timeEnd: "2021-07-16T17:00:34",
                    skillId: 18,
                }
            }
        ]
    },
    {
        username: "dpDao",
        firstName: "Pham",
        lastName: "Dao",
        attendances: [
            {
                shiftAssignmentId: 1,
                timeCheckIn: "2021-07-13T08:04:34",
                timeCheckOut: "2021-07-13T17:04:34",
                shiftAssignment: {
                    id: 1,
                    timeStart: "2021-07-13T08:00:34",
                    timeEnd: "2021-07-13T17:00:34",
                    skillId: 18,
                }
            },
            {
                shiftAssignmentId: 2,
                timeCheckIn: "2021-07-14T08:00:34",
                timeCheckOut: "2021-07-14T16:59:34",
                shiftAssignment: {
                    id: 2,
                    timeStart: "2021-07-14T08:00:34",
                    timeEnd: "2021-07-13T17:00:34",
                    skillId: 18,
                }
            },
            {
                shiftAssignmentId: 3,
                timeCheckIn: "2021-07-15T08:00:34",
                timeCheckOut: "2021-07-15T17:10:34",
                shiftAssignment: {
                    id: 3,
                    timeStart: "2021-07-15T08:00:34",
                    timeEnd: "2021-07-15T17:00:34",
                    skillId: 18,
                }
            },
            {
                shiftAssignmentId: 4,
                timeCheckIn: null,
                timeCheckOut: null,
                shiftAssignment: {
                    id: 4,
                    timeStart: "2021-07-15T08:00:34",
                    timeEnd: "2021-07-15T17:00:34",
                    skillId: 18,
                }
            },
            {
                shiftAssignmentId: 5,
                timeCheckIn: "2021-07-16T17:00:34",
                timeCheckOut: "2021-07-16T22:59:34",
                shiftAssignment: {
                    id: 5,
                    timeStart: "2021-07-16T08:00:34",
                    timeEnd: "2021-07-16T17:00:34",
                    skillId: 18,
                }
            }
        ]
    }
]

class StoreTimekeeping extends React.Component {

    constructor(props) {
        super(props);

        let fromDate = getFirstDayOfWeek(new Date());
        let toDate = new Date();

        this.init = {
            fromDate, toDate
        };

        this.state = {
            searchValue: '', openDeleteDialog: false, deleteUserId: null, openAttendanceDialog: false,
            pageSize: 10, rowCount: 0, pageIndex: 1, open: true, setOpen: false,
            selectedDate: '2014-08-18T21:11:54', selectedUser: null,
            fromDate: fromDate,
            toDate: toDate,
            dataSrc: null,
            updateData: false,
            isLoading: false
        };

    }

    initData = async () => {
        var skills = await loadSkills();

        let data = await fetchTimeKeeping(this.init.fromDate, this.init.toDate);
        this.setState({
            skillSrc: skills,
            dataSrc: data
        });
    }

    fetch = async (fromDate, toDate) => {
        let data = await fetchTimeKeeping(fromDate, toDate);
        this.setState({
            dataSrc: data,
            updateData: false
        });
    }

    componentDidMount = async () => {
        await this.initData();
    }

    componentDidUpdate = async (preState) => {

        if (this.state.updateData) {
            await this.fetch(this.state.fromDate, this.state.toDate);
        }
    }


    renderToolbar = () => {
        return (
            <div className={this.props.classes.toolbar}>
                <TextField style={{ height: '40px', width: '600px' }} placeholder="search" size='small' variant="outlined"
                />
                {/* <SearchOutlinedIcon style={{marginLeft: '-350px', color: '#50A625'}} /> */}
                <Button style={{ marginLeft: '-350px', color: '#009966' }}> <SearchTwoTone fontSize='small' /></Button>
                {/* <Button variant="outlined" className={this.props.classes.searchButton} component={Link}
                    to="/StoreTimekeeping/new"> <AddIcon />Add Store</Button> */}
            </div>
        );
    }

    renderRows = () => {
        return this.state.dataSrc.map((user, index) => {

            return (
                <AttendanceRow user={user} skillSrc={this.state.skillSrc} index={index} onRowClick={() => {
                    this.handleRowClick(user);
                }} />);
        });
    };

    handleRowClick = (user) => {
        this.setState({ selectedUser: user, openAttendanceDialog: true });

    }
    handleReCaculate = async () => {
        this.setState({ dataSrc: null });
        await calculateTimeKeeping(this.state.fromDate, this.state.toDate);
        this.setState({ updateData: true, });

    }
    renderAttandanceDialog = () => {

        const handleClose = () => { this.setState({ openAttendanceDialog: false }); };

        return (
            <Dialog
                onClose={handleClose}
                fullWidth={true}

                maxWidth="lg"
                open={this.state.openAttendanceDialog}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <Typography variant="h3">{`Scheduled Hours - ${this.state?.selectedUser?.firstName} ${this.state?.selectedUser?.lastName}`}</Typography>
                </DialogTitle>
                <DialogContent dividers style={{
                    minHeight: "60vh"
                }}>
                    {
                        this.state.selectedUser ? (
                            <AttendanceDetailTable user={this.state.selectedUser} skillSrc={this.state.skillSrc} />
                        ) : "No Content"
                    }

                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>);
    }
    render() {

        const { classes } = this.props;

        return (
            <React.Fragment>
                <Card style={{ padding: '10px', marginBottom: '15px' }} elevation={0}>
                    <div> <h1>Timekeeping</h1></div>
                    <Box height={16}></Box>
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <Grid item container direction="row" justify="flex-start" alignItems="center" spacing={4} xs={7}>
                            <Grid item >
                                <Typography variant="subtitle1">Time Period</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <DateRangePickerComponent
                                    change={(props) => {
                                        console.log(props);
                                        if (props.startDate && props.endDate && (props.startDate != this.state.fromDate ||
                                            props.endDate != this.state.toDate)) {
                                            this.setState({
                                                fromDate: props.startDate,
                                                toDate: props.endDate,
                                                updateData: true
                                            });
                                        }
                                    }}

                                    startDate={this.init.fromDate}
                                    endDate={this.init.toDate}
                                />
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Button color="primary" variant="outlined" onClick={() => {
                                this.handleReCaculate();
                            }} >Re-Calculate</Button>
                        </Grid>
                    </Grid>
                </Card>
                <Paper className={this.props.classes.container} style={{
                    height: "74vh"
                }} elevation={0}>

                    <TableContainer style={{
                        height: "100%"
                    }}>
                        <Table aria-label="simple table" stickyHeader>
                            <TableHead >
                                <TableRow>
                                    <TableCell align="left" variant="head"  >
                                        <Typography variant="h4" className={classes.theadCell}>#</Typography>
                                    </TableCell>
                                    <TableCell align="left" variant="head" style={{ color: "#fff" }} >
                                        <Typography variant="h4" className={classes.theadCell}>Username</Typography>
                                    </TableCell>
                                    <TableCell align="left" variant="head" style={{ color: "#fff" }}>
                                        <Typography variant="h4" className={classes.theadCell}>
                                            Fullname</Typography></TableCell>

                                    <TableCell align="center"><Typography className={classes.theadCell} variant="h4">Total Shift</Typography></TableCell>
                                    <TableCell align="center"><Typography variant="h4" className={classes.theadCell}>
                                        Total Hours</Typography></TableCell>
                                    <TableCell align="center"><Typography className={classes.theadCell} variant="h4">Absent</Typography></TableCell>
                                    <TableCell align="center"><Typography className={classes.theadCell} variant="h4">Late Check in</Typography></TableCell>
                                    <TableCell align="center"><Typography className={classes.theadCell} variant="h4">Early Check out</Typography></TableCell>

                                </TableRow>
                            </TableHead>
                            {
                                <TableBody>
                                    {
                                        this.state.dataSrc ? this.renderRows() : (
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
                            }

                        </Table>

                    </TableContainer>

                    {this.renderAttandanceDialog()}
                </Paper>
            </React.Fragment>

        );


    }
}
function mapState(state) {
    // const { StoreTimekeeping, deleting } = state;
    return {};
}

export default connect(mapState, {
    // getAllByPage: storeActions.getAllByPage,
    // deleteStore: storeActions.delete

})(withStyles(styles, { withTheme: true })(StoreTimekeeping));

