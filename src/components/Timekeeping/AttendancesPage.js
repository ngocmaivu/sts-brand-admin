import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { connect } from 'react-redux';
import { Button, createStyles, Dialog, DialogContent, TableCell, DialogContentText, DialogTitle, DialogActions, InputAdornment, TextField, withStyles, Paper, Card, Grid, TableContainer, Table, TableHead, TableRow, TableBody, IconButton, Collapse, Typography, FormControl, FormLabel, List, ListItem, ListItemText, CardHeader, FormControlLabel, Box, Chip, Divider, CardMedia, CardActionArea, CardContent, ListSubheader } from '@material-ui/core';

import MuiAlert from '@material-ui/lab/Alert';

import { DateRangePicker, DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import { getFirstDayOfWeek } from "../../ultis/scheduleHandle";
import { fetchAllAttandances, fetchAttandances, getStaffs, deleteAttandance, createAttandance } from "../../_services";
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import addDays from 'date-fns/addDays';

import clsx from 'clsx';
import { DatePicker, TimePicker } from '@material-ui/pickers';
import format from 'date-fns/format';
import { AddAttandanceDialog } from './AddAttandanceDialog';
import ConfirmDialog from '../ConfirmDialog';
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
        color: "#fff"
    },
    listItem: {
        opacity: 0.7
    },
    selectedItem: {
        opacity: 1,
        color: Theme.palette.primary.main
    },
    row: {
        "&:hover": {
            cursor: "pointer"
        }
    }
});



class AttendancesPage extends React.Component {


    constructor(props) {
        super(props);

        let fromDate = getFirstDayOfWeek(new Date());
        let toDate = new Date();

        this.init = {
            fromDate, toDate
        };

        const user = JSON.parse(localStorage.getItem("jwt_decode"));
        this.StoreId = user.storeId;

        this.state = {
            searchValue: '', openDeleteDialog: false, deleteUserId: null, openAttendanceDialog: false,
            openDeleleDialog: false,
            deleteId: null,
            pageSize: 10, rowCount: 0, pageIndex: 1, open: true, setOpen: false,
            selectedDate: '2014-08-18T21:11:54', selectedUser: null,
            fromDate: fromDate,
            toDate: toDate,
            dataSrc: null,
            updateData: false,
            selectedIndexUser: -1,
            selectRowIndex: 0,
            currentUsername: null
        };

    }
    loadData = async () => {
        var staffs = await getStaffs();

        this.setState({
            staffs: staffs
        });
    }

    initData = async () => {
        var staffs = await getStaffs();
        console.log(staffs);
        this.loadAttandances(null, this.init.fromDate, this.init.toDate);
        this.setState({
            staffs: staffs,
            currentUsername: null,
            selectedIndexUser: -1
        });


    }



    componentDidMount = async () => {
        this.initData();

    }

    componentDidUpdate = async (preState) => {
        //gọi api
        if (this.state.updateData) {
            this.loadAttandances(this.state.currentUsername, this.state.fromDate, this.state.toDate);
        }
    }

    loadAttandances = async (username, fromDate, toDate) => {
        let data = [];
        if (!username) {
            data = await fetchAllAttandances(fromDate, toDate);
        } else {
            data = await fetchAttandances(username, fromDate, toDate);
        }

        if (data.length > 0) {
            this.setState({ attandances: data, updateData: false, selectRowIndex: 0, currentAttandance: data[0] });
        } else {
            this.setState({ attandances: data, updateData: false, selectRowIndex: 0, currentAttandance: null });
        }

        console.log(data);
    }

    renderAttandanceDialog = () => {

        const handleClose = () => { this.setState({ openAttendanceDialog: false }); };

        return (
            this.state.staffs ?
                <AddAttandanceDialog open={this.state.openAttendanceDialog} handleClose={handleClose}
                    staffCurrent={this.state.currentUsername}
                    handleSubmit={this.handleSaveAttandance}
                    storeId={this.StoreId}
                    staffs={this.state.staffs} /> : null);
    }

    handleSaveAttandance = async (attandance) => {
        const response = await createAttandance(attandance);
        this.loadAttandances(this.state.currentUsername, this.state.fromDate, this.state.toDate);
        return response;
    }

    getCheckType(type) {
        if (type == 3) return "Manual";
        return "Camera";
    }

    handleDelete = async (id) => {
        await deleteAttandance(id);
        this.loadAttandances(this.state.currentUsername, this.state.fromDate, this.state.toDate);
    }

    renderConfirmDeleteDialog = () => {
        const handleClose = () => { this.setState({ openDeleleDialog: false }); };
        return (
            <ConfirmDialog
                open={this.state.openDeleleDialog}
                message={`Do you want to delete this attandance ?`}
                title="Delete"
                handleClose={handleClose}
                handleConfirm={
                    async () => {
                        this.handleDelete(this.state.deleteId);
                        handleClose();
                    }
                }
            />
        )
    }

    render() {

        const { classes } = this.props;

        return (
            <React.Fragment>
                <Card style={{ padding: '12px', paddingLeft: 18, marginBottom: '16px' }} elevation={0}>
                    <Typography variant="h3">Attandance</Typography>
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
                                this.setState({ openAttendanceDialog: true })
                            }}>Add manually</Button>
                        </Grid>
                    </Grid>

                </Card>

                <Grid container direction="row" spacing={2}>
                    <Grid item xs={2}>
                        <Paper className={this.props.classes.container} style={{ height: "70vh", padding: "16px 12px" }} elevation={0}>
                            <List
                                style={{ height: "100%", overflow: 'auto', }}
                                subheader={
                                    <ListSubheader component="div" style={{ backgroundColor: '#fff', borderBottom: "1px solid inherit" }} >
                                        <Typography variant="h4">Staff</Typography>
                                    </ListSubheader>
                                }>

                                {
                                    this.state.staffs ?
                                        (
                                            <React.Fragment>
                                                <ListItem button
                                                    onClick={() => { this.setState({ selectedIndexUser: -1, updateData: true, currentUsername: null }) }}
                                                    selected={this.state.selectedIndexUser === -1}
                                                    className={clsx(classes.listItem, {
                                                        [classes.selectedItem]: this.state.selectedIndexUser === -1,
                                                    })}>
                                                    <ListItemText >
                                                        <Typography variant="subtitle1">All</Typography>
                                                    </ListItemText>
                                                </ListItem>
                                                {
                                                    this.state.staffs.map(
                                                        (staff, index) => {
                                                            return (
                                                                <ListItem button key={staff.username}
                                                                    onClick={() => { this.setState({ selectedIndexUser: index, updateData: true, currentUsername: staff.username }) }}
                                                                    selected={this.state.selectedIndexUser === index}
                                                                    className={clsx(classes.listItem, {
                                                                        [classes.selectedItem]: this.state.selectedIndexUser === index,
                                                                    })}>
                                                                    <ListItemText >
                                                                        <Typography variant="subtitle1">{staff.firstName + " " + staff.lastName}</Typography>
                                                                    </ListItemText>
                                                                </ListItem>
                                                            )
                                                        }
                                                    )
                                                }
                                            </React.Fragment>

                                        ) : ".. loading"
                                }
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={7}>
                        <Paper className={this.props.classes.container} style={{ height: "70vh" }} elevation={0}>
                            <TableContainer style={{ height: "100%" }}>
                                <Table aria-label="simple table" stickyHeader>
                                    <TableHead >
                                        <TableRow>
                                            <TableCell align="left" variant="head" >
                                                <Typography variant="h4">Username</Typography>
                                            </TableCell>
                                            <TableCell align="left" variant="head" >
                                                <Typography variant="h4">Date</Typography>
                                            </TableCell>
                                            <TableCell align="left" variant="head">
                                                <Typography variant="h4" >
                                                    Time Check</Typography></TableCell>
                                            <TableCell align="center"><Typography variant="h4">
                                                Check Type</Typography></TableCell>
                                            <TableCell align="center"><Typography variant="h4">Device Code</Typography></TableCell>
                                            {/* <TableCell align="center"><Typography variant="h4">Create by</Typography></TableCell> */}
                                            <TableCell align="center"><Typography variant="h4">Actions</Typography></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {

                                        <TableBody>
                                            {
                                                this.state.attandances ?

                                                    this.state.attandances.length == 0 ?
                                                        (<TableRow > <TableCell colSpan={6} align="center">No Records</TableCell></TableRow>)
                                                        :
                                                        (this.state.attandances.map(
                                                            (attandance, index) => {
                                                                return (
                                                                    <TableRow selected={this.state.selectRowIndex == index} key={index}
                                                                        className={this.props.classes.row}
                                                                        onClick={() => { this.setState({ selectRowIndex: index, currentAttandance: attandance }) }}>
                                                                        <TableCell >
                                                                            <Typography variant="subtitle1">{attandance.username}</Typography>
                                                                        </TableCell>
                                                                        <TableCell >
                                                                            <Typography variant="subtitle1">{format(
                                                                                new Date(attandance.timeCheck), "dd/MM/yyyy"
                                                                            )}</Typography>
                                                                        </TableCell>
                                                                        <TableCell align="left">
                                                                            <Typography variant="subtitle1" >
                                                                                {format(
                                                                                    new Date(attandance.timeCheck), "HH:mm a"
                                                                                )}</Typography></TableCell>
                                                                        <TableCell align="center">
                                                                            <Chip label={this.getCheckType(attandance.checkType)} color="primary" variant="outlined" />
                                                                        </TableCell>
                                                                        <TableCell align="center"><Typography variant="subtitle1">{attandance.deviceCode}</Typography></TableCell>
                                                                        {/* <TableCell align="center"><Typography variant="subtitle1">{attandance.createBy}</Typography></TableCell> */}
                                                                        <TableCell align="center">
                                                                            <IconButton onClick={() => {
                                                                                this.setState({ openDeleleDialog: true, deleteId: attandance.id });
                                                                            }}>
                                                                                <DeleteOutlineOutlinedIcon />
                                                                            </IconButton>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                );
                                                            }
                                                        ))

                                                    : (<TableRow > <TableCell colSpan={6} align="center">Loading...</TableCell></TableRow>)
                                            }
                                        </TableBody>

                                    }

                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper elevation={0}>
                            {
                                this.state.currentAttandance ?
                                    (<Grid container justify="space-between" direction="column" className={this.props.classes.container} style={{ minHeight: "70vh" }}>
                                        <Grid item>
                                            <Typography variant="h4">Detail</Typography>
                                            <Box height={8} />
                                            <Divider />
                                            <Card style={{ padding: 8, border: "none" }} elevation={0} >
                                                <Typography variant="h5" color="textPrimary">
                                                    Time Check in: {format(new Date(this.state.currentAttandance.timeCheck), "dd/MM/yyyy - HH:mm a")}
                                                </Typography>
                                                {
                                                    this.state.currentAttandance.checkType == 0 ?
                                                        (
                                                            <React.Fragment>
                                                                <Typography variant="h5" color="textPrimary">
                                                                    Image:
                                                                </Typography>
                                                                <img src={this.state.currentAttandance.imageUrl} style={{
                                                                    // height: 300,
                                                                    width: "100%"
                                                                }} />
                                                                <CardContent>
                                                                    <Grid container direction="row" alignItems="center" spacing={1}>
                                                                        <Grid item>
                                                                            <Typography variant="subtitle1" color="textSecondary">
                                                                                Recognize Percentage:
                                                                            </Typography></Grid>
                                                                        <Grid item>
                                                                            <Typography variant="h3" color="textPrimary">
                                                                                {this.state.currentAttandance.recognizePercentage.toFixed(2)}%
                                                                            </Typography>
                                                                        </Grid>
                                                                    </Grid>
                                                                </CardContent>
                                                            </React.Fragment>
                                                        ) :
                                                        this.state.currentAttandance.checkType == 3 ?
                                                            (<React.Fragment>
                                                                {

                                                                }
                                                            </React.Fragment>


                                                            ) : null
                                                }

                                                <CardContent>
                                                    <Grid container direction="column" spacing={1}>
                                                        <Grid item>
                                                            <Typography variant="subtitle2" color="textSecondary" component="p">
                                                                Note: {this.state.currentAttandance.note}
                                                            </Typography></Grid>
                                                        <Grid item>
                                                            <Typography variant="h3" color="textPrimary">

                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </Card>

                                        </Grid>
                                        <Grid item>

                                            <Button style={{ backgroundColor: "#ea3529", color: "#fff", padding: "10px 20px", width: "100%" }}
                                                onClick={
                                                    () => {
                                                        this.setState({ openDeleleDialog: true, deleteId: this.state.currentAttandance.id });
                                                    }
                                                }>
                                                Reject
                                            </Button>

                                        </Grid>
                                    </Grid>)
                                    : null
                            }


                        </Paper>
                    </Grid>
                </Grid>
                {this.renderAttandanceDialog()}
                {this.renderConfirmDeleteDialog()}
            </React.Fragment>

        );


    }
}
function mapState(state) {
    // const {StoreTimekeeping, deleting} = state;
    return {};
}

export default connect(mapState, {
    // getAllByPage: storeActions.getAllByPage,
    // deleteStore: storeActions.delete

})(withStyles(styles, { withTheme: true })(AttendancesPage));

