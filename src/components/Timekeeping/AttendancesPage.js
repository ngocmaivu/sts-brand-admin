import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { connect } from 'react-redux';
import { Button, createStyles, Dialog, DialogContent, TableCell, DialogContentText, DialogTitle, DialogActions, InputAdornment, TextField, withStyles, Paper, Card, Grid, TableContainer, Table, TableHead, TableRow, TableBody, IconButton, Collapse, Typography, FormControl, FormLabel, List, ListItem, ListItemText, CardHeader, FormControlLabel, Box, Chip, Divider, CardMedia, CardActionArea, CardContent } from '@material-ui/core';

import MuiAlert from '@material-ui/lab/Alert';
import { Delete, Edit, ImageSearch, ImageSearchTwoTone, SearchTwoTone, ViewAgenda, ViewStreamOutlined, VisibilityOutlined } from '@material-ui/icons';
import { Pagination, Skeleton } from '@material-ui/lab';
import { DateRangePicker, DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import { getFirstDayOfWeek } from "../../ultis/scheduleHandle";
import { loadSkills, fetchTimeKeeping, getStaffs } from "../../_services";
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import addDays from 'date-fns/addDays';
import { AttendanceDetailTable } from './AttendanceDetailTable';
import clsx from 'clsx';
import { DatePicker, TimePicker } from '@material-ui/pickers';
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

        this.state = {
            searchValue: '', openDeleteDialog: false, deleteUserId: null, openAttendanceDialog: false,
            pageSize: 10, rowCount: 0, pageIndex: 1, open: true, setOpen: false,
            selectedDate: '2014-08-18T21:11:54', selectedUser: null,
            fromDate: fromDate,
            toDate: toDate,
            dataSrc: null,
            updateData: false,
            selectedIndexUser: -1
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
        this.setState({
            staffs: staffs
        });

        // var skills = await loadSkills();

        // let data = await fetchTimeKeeping(this.init.fromDate, this.init.toDate);
        // this.setState({
        //     skillSrc: skills,
        //     dataSrc: data
        // });
    }



    componentDidMount = async () => {
        this.initData();
    }

    componentDidUpdate = async (preState) => {
    }





    renderAttandanceDialog = () => {

        const handleClose = () => { this.setState({ openAttendanceDialog: false }); };

        return (
            <Dialog
                onClose={handleClose}
                fullWidth={true}
                maxWidth="sm"
                open={this.state.openAttendanceDialog}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <Typography variant="h3">Add Attandance</Typography>
                </DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <FormLabel>Staff Name</FormLabel>
                                <TextField id="outlined-basic" variant="outlined" size="small" value="Ly Van Cuong"
                                    inputProps={{ readonly: true }} />

                            </FormControl>
                        </Grid>
                        <Grid container item direction="row" spacing={2} justify="space-between">
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <FormLabel>Date</FormLabel>
                                    <DatePicker inputVariant="outlined" size="small" />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <FormLabel>Time check</FormLabel>
                                    <TimePicker size="small" inputVariant="outlined" />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <FormLabel>Note:</FormLabel>
                                <TextField id="outlined-basic" variant="outlined" size="small" multiline rows={5}
                                    inputProps={{ readonly: true }} />

                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary"> Close</Button>
                    <Button onClick={handleClose} color="primary"> Save</Button>
                </DialogActions>
            </Dialog>);
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
                                <DateRangePickerComponent />
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
                        <Paper className={this.props.classes.container} style={{ minHeight: "70vh", padding: "16px 12px" }} elevation={0}>
                            <List>
                                {
                                    this.state.staffs ?
                                        (
                                            this.state.staffs.map(
                                                (staff, index) => {
                                                    return (
                                                        <ListItem button key={staff.username}
                                                            onClick={() => { this.setState({ selectedIndexUser: index }) }}
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
                                        ) : ".. loading"
                                }
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={7}>
                        <Paper className={this.props.classes.container} style={{ minHeight: "70vh" }} elevation={0}>
                            <TableContainer>
                                <Table aria-label="simple table" >
                                    <TableHead >
                                        <TableRow>

                                            <TableCell align="left" variant="head" >
                                                <Typography variant="h4">Date</Typography>
                                            </TableCell>
                                            <TableCell align="left" variant="head">
                                                <Typography variant="h4" >
                                                    Time Check</Typography></TableCell>
                                            <TableCell align="center"><Typography variant="h4">
                                                Check Type</Typography></TableCell>
                                            <TableCell align="center"><Typography variant="h4">Device Code</Typography></TableCell>
                                            <TableCell align="center"><Typography variant="h4">Create by</Typography></TableCell>
                                            <TableCell align="center"><Typography variant="h4">Actions</Typography></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {

                                        <TableBody>
                                            <TableRow selected>
                                                <TableCell >
                                                    <Typography variant="subtitle1">26/07/2021</Typography>
                                                </TableCell>
                                                <TableCell align="left" variant="head">
                                                    <Typography variant="subtitle1" >
                                                        7:02 AM</Typography></TableCell>
                                                <TableCell align="center"><Chip label="Camera" color="primary" variant="outlined" />
                                                </TableCell>
                                                <TableCell align="center"><Typography variant="subtitle1">A1</Typography></TableCell>
                                                <TableCell align="center"><Typography variant="subtitle1">Cuong Ly</Typography></TableCell>
                                                <TableCell align="center">
                                                    <IconButton>
                                                        <DeleteOutlineOutlinedIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell >
                                                    <Typography variant="subtitle1">26/07/2021</Typography>
                                                </TableCell>
                                                <TableCell align="left" variant="head">
                                                    <Typography variant="subtitle1" >
                                                        12:02 PM</Typography></TableCell>
                                                <TableCell align="center"><Chip label="Camera" color="primary" variant="outlined" />
                                                </TableCell>
                                                <TableCell align="center"><Typography variant="subtitle1">A1</Typography></TableCell>
                                                <TableCell align="center"><Typography variant="subtitle1">Cuong Ly</Typography></TableCell>
                                                <TableCell align="center">
                                                    <IconButton>
                                                        <DeleteOutlineOutlinedIcon />
                                                    </IconButton>
                                                </TableCell> </TableRow>
                                            <TableRow>
                                                <TableCell >
                                                    <Typography variant="subtitle1">27/07/2021</Typography>
                                                </TableCell>
                                                <TableCell align="left" variant="head">
                                                    <Typography variant="subtitle1" >
                                                        7:01 AM</Typography></TableCell>
                                                <TableCell align="center"><Chip label="Camera" color="primary" variant="outlined" />
                                                </TableCell>
                                                <TableCell align="center"><Typography variant="subtitle1">A1</Typography></TableCell>
                                                <TableCell align="center"><Typography variant="subtitle1">Cuong Ly</Typography></TableCell>
                                                <TableCell align="center">
                                                    <IconButton>
                                                        <DeleteOutlineOutlinedIcon />
                                                    </IconButton>
                                                </TableCell></TableRow>
                                            <TableRow>
                                                <TableCell >
                                                    <Typography variant="subtitle1">27/07/2021</Typography>
                                                </TableCell>
                                                <TableCell align="left" variant="head">
                                                    <Typography variant="subtitle1" >
                                                        12:02 PM</Typography></TableCell>
                                                <TableCell align="center"><Chip label="Camera" color="primary" variant="outlined" />
                                                </TableCell>
                                                <TableCell align="center"><Typography variant="subtitle1">A1</Typography></TableCell>
                                                <TableCell align="center"><Typography variant="subtitle1">Cuong Ly</Typography></TableCell>
                                                <TableCell align="center">
                                                    <IconButton>
                                                        <DeleteOutlineOutlinedIcon />
                                                    </IconButton>
                                                </TableCell></TableRow>
                                            <TableRow>
                                                <TableCell >
                                                    <Typography variant="subtitle1">28/07/2021</Typography>
                                                </TableCell>
                                                <TableCell align="left" variant="head">
                                                    <Typography variant="subtitle1" >
                                                        6:59 AM</Typography></TableCell>
                                                <TableCell align="center"><Chip label="Camera" color="primary" variant="outlined" />
                                                </TableCell>
                                                <TableCell align="center"><Typography variant="subtitle1">A1</Typography></TableCell>
                                                <TableCell align="center"><Typography variant="subtitle1">Cuong Ly</Typography></TableCell>
                                                <TableCell align="center">
                                                    <IconButton>
                                                        <DeleteOutlineOutlinedIcon />
                                                    </IconButton>
                                                </TableCell></TableRow>
                                            <TableRow>
                                                <TableCell >
                                                    <Typography variant="subtitle1">28/07/2021</Typography>
                                                </TableCell>
                                                <TableCell align="left" variant="head">
                                                    <Typography variant="subtitle1" >
                                                        12:02 PM</Typography></TableCell>
                                                <TableCell align="center"><Chip label="Camera" color="primary" variant="outlined" />
                                                </TableCell>
                                                <TableCell align="center"><Typography variant="subtitle1">A1</Typography></TableCell>
                                                <TableCell align="center"><Typography variant="subtitle1">Cuong Ly</Typography></TableCell>
                                                <TableCell align="center">
                                                    <IconButton>
                                                        <DeleteOutlineOutlinedIcon />
                                                    </IconButton>
                                                </TableCell></TableRow>
                                        </TableBody>

                                    }

                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper elevation={0}>
                            <Grid container justify="space-between" direction="column" className={this.props.classes.container} style={{ minHeight: "70vh" }}>

                                <Grid item>
                                    <Typography variant="h4">Detail</Typography>
                                    <Box height={8} />
                                    <Divider />

                                    <Card style={{ padding: 8, border: "none" }} elevation={0} >
                                        <Typography variant="h5" color="textPrimary">
                                            Time Check in: 27/07/2021 - 7:00 AM
                                        </Typography>
                                        <Typography variant="h5" color="textPrimary">
                                            Check By: Camera
                                        </Typography>
                                        <Typography variant="h5" color="textPrimary">
                                            Device Code: A1
                                        </Typography>
                                        <Typography variant="h5" color="textPrimary">
                                            Create By: Cuong Ly
                                        </Typography>
                                        <Typography variant="h5" color="textPrimary">
                                            Image:
                                        </Typography>
                                        <CardMedia
                                            style={{
                                                height: 300,

                                            }}
                                            image="https://www.facebeautyscience.com/wp-content/uploads/2020/04/face-beauty-skin-face2-proc.jpg"
                                            title="Contemplative Reptile"
                                        />
                                        <CardContent>
                                            <Grid container direction="row" alignItems="center" spacing={1}>
                                                <Grid item>
                                                    <Typography variant="subtitle1" color="textSecondary">
                                                        Recognize Percentage:
                                                    </Typography></Grid>
                                                <Grid item>
                                                    <Typography variant="h3" color="textPrimary">
                                                        96%
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                        <CardContent>
                                            <Grid container direction="column" spacing={1}>
                                                <Grid item>
                                                    <Typography variant="subtitle1" color="textSecondary">
                                                        Note:
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

                                    <Button style={{ backgroundColor: "#ea3529", color: "#fff", padding: "10px 20px", width: "100%" }}>
                                        Reject
                                    </Button>

                                </Grid>
                            </Grid>

                        </Paper>
                    </Grid>
                </Grid>
                {this.renderAttandanceDialog()}
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

