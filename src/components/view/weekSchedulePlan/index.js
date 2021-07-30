import React from 'react';
import { withRouter } from "react-router";
import { createStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, CardContent, CardHeader, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, FormLabel, Grid, IconButton, Tab, Tabs, Tooltip, Typography } from '@material-ui/core';
import WeekPicker from '../../WeekPicker';
import { format, isSameDay, startOfWeek, } from 'date-fns';
import { cloneSchedule, deleteWeekSchedule, publishSchedule, unpublishSchedule, } from '../../../_services';
import { cloneSchedulesDataFromFirebase, getSchedulesDataFromFirebase, getTotalHoursPerWeek } from '../../../ultis/scheduleHandle';
import { Skeleton } from '@material-ui/lab';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import { fetchWeekSchedules } from "../../../_actions/";
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';
import PublishRoundedIcon from '@material-ui/icons/PublishRounded';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import { connect } from 'react-redux';
import { weekScheduleStatus } from './status';
import { addDays } from '@syncfusion/ej2-react-schedule';
import history from '../../../history';
import AddWeekSchedulePlanDialog from './AddWeekSchedulePlanDialog';
import _, { identity } from 'lodash';

const styles = (Theme) => createStyles({
    container: {
        height: '100%',
        padding: 16
    },
    containerContent: {
        padding: "20px 20px"
    },
    weekScheduleRow: {
        "&:hover": {
            cursor: "pointer"
        }
    }
});

class WeekPlanManage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dateStart: startOfWeek(new Date(), {
                weekStartsOn: 1
            }),
            weekScheduleId: null,
            tabIndex: 0,
            openAddDialog: false,
            openDeleteDialog: false,
            disabledCloneButton: false,
            disabledPublishButton: false,
            disabledUnpublishButton: false,
            publishScheduleId: null,
            cloneScheduleId: null,
            currentScheduleId: null
        };
        const user = JSON.parse(localStorage.getItem("jwt_decode"));
        this.BrandId = user.brandId;
        this.StoreId = user.storeId;
    }

    handleWeekChange = async (date) => {
        if (isSameDay(startOfWeek(date, {
            weekStartsOn: 1
        }), this.state.dateStart)) return;

        this.setState({
            dateStart: startOfWeek(date, {
                weekStartsOn: 1
            })
        });
    }

    fetchData = async () => {
        let status = this.props.match.params.status;
        if (status && (status == "published" || status == "unpublished")) {
            this.props.fetchWeekSchedules(this.state.dateStart, status);
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.dateStart != this.state.dateStart || this.props.match.params.status != this.props.status) {
            this.fetchData();
        }

    }

    componentDidMount = () => {
        this.fetchData();
    }

    getTitleHeader = () => {
        let status = this.props.match.params.status;
        if (status) {
            if (status == "published") return "Published Schedule";
            if (status == "unpublished") return "Unpublish Schedule";
        }
    }

    handleChange = (event, newValue) => {
        console.log(event);
        this.setState({ tabIndex: newValue });
    }

    handleRowClick = (id) => {
        console.log("Redirect");
        history.push(`/schedule/plans/detail/${id}`);
    }
    renderWeekScheduleRows = () => {
        const dateFormat = "dd/MM/yyyy";


        if (_.isEmpty(this.props.weekSchedules)) {
            let emptyRender = "No Schedule";
            if (this.props.match.params.status == "published") emptyRender = "No published schedule yet";
            return (
                <TableRow >
                    <TableCell align="center" colSpan="8">{emptyRender}</TableCell>
                </TableRow>
            );
        }

        return this.props.weekSchedules.map(weekSchedule => {

            return (
                <TableRow key={weekSchedule.id} hover className={this.props.classes.weekScheduleRow} onClick={
                    () => { this.handleRowClick(weekSchedule.id); }
                } >
                    <TableCell align="center">{weekSchedule.id}</TableCell>
                    <TableCell align="left" variant="head" >Plan name</TableCell>
                    <TableCell align="center">{format(new Date(weekSchedule.dateStart), dateFormat)}</TableCell>
                    <TableCell align="center">{format(addDays((new Date(weekSchedule.dateStart)), 6), dateFormat)}</TableCell>
                    <TableCell align="center">{format(new Date(weekSchedule.dateCreated), dateFormat)}</TableCell>
                    <TableCell align="center">Create By</TableCell>
                    <TableCell align="center">Last result</TableCell>
                    <TableCell align="center" onClick={(e) => { e.stopPropagation(); }}>
                        {
                            this.renderActionButtons(weekSchedule.status, weekSchedule.id)
                        }
                    </TableCell>
                </TableRow>
            );
        })
    }
    renderActionButtons = (status, id) => {
        switch (status) {
            case weekScheduleStatus.PUBLISHED:
                return (
                    <React.Fragment>
                        <Tooltip title="Duplicate">
                            <IconButton onClick={(e) => { this.cloneSchedule(id) }} disabled={this.state.cloneScheduleId == id && this.state.disabledCloneButton}>
                                <FileCopyOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete" >

                            <IconButton onClick={(e) => { this.setState({ deleteId: id, openDeleteDialog: true }); }}>
                                <DeleteOutlineOutlinedIcon />
                            </IconButton>

                        </Tooltip>

                        <Tooltip title="Unpublish">
                            <IconButton onClick={(e) => { this.unpublishSchedule(id) }} disabled={this.state.currentScheduleId == id}>
                                <GetAppRoundedIcon />
                            </IconButton>
                        </Tooltip>
                    </React.Fragment>
                );
            case weekScheduleStatus.UNPUBLISHED:
                return (
                    <React.Fragment>
                        <Tooltip title="Duplicate">
                            <IconButton onClick={(e) => { this.cloneSchedule(id) }} disabled={this.state.currentScheduleId == id}>
                                <FileCopyOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton onClick={(e) => { this.setState({ deleteId: id, openDeleteDialog: true }); }}>
                                <DeleteOutlineOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Publish" onClick={(e) => { this.publishSchedule(id) }} disabled={this.state.currentScheduleId == id}>
                            <IconButton>
                                <PublishRoundedIcon />
                            </IconButton>
                        </Tooltip>
                    </React.Fragment>
                );

            default:
        }
    }

    cloneSchedule = async (weekScheduleId) => {
        this.setState({ disabledCloneButton: true, currentScheduleId: weekScheduleId });

        let result = await cloneSchedule(weekScheduleId);
        this.setState({ disabledCloneButton: false, currentScheduleId: -1 });
        this.fetchData();
        cloneSchedulesDataFromFirebase(weekScheduleId, result.id, this.StoreId, this.BrandId);
        // getSchedulesDataFromFirebase(weekScheduleId, this.StoreId, this.BrandId, getScheduleCallback);
    }

    publishSchedule = (weekScheduleId) => {
        this.setState({ currentScheduleId: weekScheduleId });
        const getScheduleCallback = async (shifts) => {
            await publishSchedule(weekScheduleId, shifts);
            this.setState({ currentScheduleId: -1 });
            this.fetchData();
        }

        getSchedulesDataFromFirebase(weekScheduleId, this.StoreId, this.BrandId, getScheduleCallback);
    }

    unpublishSchedule = async (weekScheduleId) => {
        this.setState({ currentScheduleId: weekScheduleId });
        await unpublishSchedule(weekScheduleId);
        this.setState({ currentScheduleId: -1 });
        this.fetchData();
    }

    handleDeleteWeekSchedule = async () => {
        console.log(this.state.deleteId);
        await deleteWeekSchedule(this.state.deleteId);
        this.setState({ deleteId: null });
        this.fetchData();
    }
    renderDeleteDialog = () => {

        const handleClose = () => {
            this.setState({ openDeleteDialog: false });
        }

        return (
            <Dialog
                open={this.state.openDeleteDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete Dialog?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {`Do you want to delete this week plan:${this.state.deleteId} `}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => {
                        this.handleDeleteWeekSchedule();
                        handleClose();
                    }} color="primary" autoFocus>
                        Confirm
                    </Button>

                </DialogActions>
            </Dialog>
        );
    }

    render() {
        return (<div>
            <Paper style={{ padding: 16, marginBottom: 12 }} elevation={0}>  <Typography variant="h2">
                Schedule Plan
            </Typography>
                <FormControl margin="normal" variant="outlined" >
                    <FormLabel >Select Week</FormLabel>
                    <WeekPicker onChange={this.handleWeekChange} value={this.state.dateStart} />
                </FormControl>
            </Paper>

            <Paper className={this.props.classes.container}>
                <CardHeader title={this.getTitleHeader()} titleTypographyProps={{ variant: "h3" }} style={{ paddingTop: 10 }}
                    action={
                        this.props.match.params.status == "unpublished" ?
                            (<IconButton color="primary" onClick={() => {
                                this.setState({ openAddDialog: true });
                            }} >
                                <AddRoundedIcon />
                            </IconButton>) : null
                    } />

                {/* <Typography variant="h4">{this.getTitleHeader()} </Typography> */}
                <Divider />
                <CardContent className={this.props.classes.containerContent}>

                    <TableContainer>
                        <Table aria-label="simple table" >
                            <TableHead>
                                <TableRow >
                                    <TableCell align="center">WeekId</TableCell>
                                    <TableCell align="left" variant="head" >Plan name</TableCell>
                                    <TableCell align="center">From Date</TableCell>
                                    <TableCell align="center">To Date</TableCell>
                                    <TableCell align="center">Create Date</TableCell>
                                    <TableCell align="center">Create By</TableCell>
                                    <TableCell align="center">Last result</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                {
                                    this.props.weekSchedules ?
                                        (
                                            this.renderWeekScheduleRows()
                                        ) : "...Loading"
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <AddWeekSchedulePlanDialog open={this.state.openAddDialog} handleClose={() => {
                        this.setState({ openAddDialog: false });
                    }} />

                    {
                        this.renderDeleteDialog()
                    }
                </CardContent>
            </Paper>
        </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        weekSchedules: state.schedule.weekSchedules,
        status: state.schedule.status
    }
}
export default connect(
    mapStateToProps, {
    fetchWeekSchedules
}
)(
    withRouter(withStyles(styles)(WeekPlanManage)));