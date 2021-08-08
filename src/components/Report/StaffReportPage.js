import React from 'react';
import { createStyles, withStyles } from '@material-ui/core/styles';
import { getStaffs } from "../../_services";
import { fetchStaffReport } from "../../_actions"
import Paper from '@material-ui/core/Paper';
import {
    Box, Button, Card, CardContent, CardHeader, Divider, FormControl, FormLabel, Grid, Typography, List, ListItem, ListItemText
    , ListSubheader
} from '@material-ui/core';
import { DateRangePicker, DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import { format, isSameDay, startOfWeek, } from 'date-fns';
import clsx from 'clsx';
import { getFirstDayOfWeek } from "../../ultis/scheduleHandle";
import { Skeleton } from '@material-ui/lab';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
    DataGrid, GridFooter, GridFooterContainer, GridPanelFooter, GridToolbarContainer,
    GridToolbarExport,
} from '@material-ui/data-grid';

const styles = (Theme) => createStyles({
    container: {
        height: '100%'
    },
    containerContent: {
        padding: "20px 20px"
    },
    listItem: {
        opacity: 0.7
    },
    selectedItem: {
        opacity: 1,
        color: Theme.palette.primary.main
    },

});

const rows = [
    {
        id: 1,
        date: "2010-08-10",
        store: "Store 1",
        checkIn: "7:00",
        checkOut: "12:00",
        totalHours: "5 hrs 30mins"
    }
];

const columns = [
    {
        field: 'date',
        headerName: 'Date',
        type: 'date',
        valueFormatter: ({ value }) => format(new Date(value), "dd/MM/yyyy"),
        flex: 1,
    },
    {
        field: 'timeStart',
        headerName: 'Start',
        type: 'datetime',
        valueFormatter: ({ value }) => format(new Date(value), "HH:mm"),
        flex: 1,
    },
    {
        field: 'timeEnd',
        headerName: 'End',
        type: 'datetime',
        valueFormatter: ({ value }) => format(new Date(value), "HH:mm"),
        flex: 1,
    },
    {
        field: 'timeCheckIn',
        headerName: 'Check In',
        type: 'datetime',
        valueFormatter: ({ value }) => format(new Date(value), "HH:mm"),
        flex: 1,

    },
    {
        field: 'timeCheckOut',
        headerName: 'Check Out',
        type: 'datetime',
        valueFormatter: ({ value }) => format(new Date(value), "HH:mm"),
        flex: 1,
    },

    {
        field: 'arrivedLate',
        headerName: 'Arrived Late',
        type: 'boolean',
        flex: 1,
    },
    {
        field: 'leftEarly',
        headerName: 'Left Early',
        type: 'boolean',
        flex: 1,
    },
    {
        field: 'absent',
        headerName: 'Absent',
        type: 'boolean',
        flex: 1,
    },
    {
        field: 'workHours',
        headerName: 'Total Hours',
        type: 'number',
        valueFormatter: ({ value }) => Number(value).toFixed(2),
        flex: 1,
    },
    // {
    //     field: 'fullName',
    //     headerName: 'Full name',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: false,
    //     width: 160,
    //     valueGetter: (params) =>
    //         `${params.getValue(params.id, 'firstName') || ''} ${params.getValue(params.id, 'lastName') || ''
    //         }`,
    // },
];
function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}
function CustomFooter({ totalWorkHours, totalArriveLate, totalLeaveEarly, totalAbsent }) {
    return (
        <GridFooterContainer>
            <GridPanelFooter>
                <Grid container >
                    <Grid item container xs={12} justify="space-between"
                        justifyContent="center" alignContent="center"
                        alignItems="center" >
                        <Grid item xs={3}
                        //  style={{
                        //     borderRight: "1px solid"
                        // }}
                        >
                            <Typography variant="subtitle1" align="center">
                                Total Working: {totalWorkHours}
                            </Typography>
                        </Grid>
                        <Grid item xs={3} >
                            <Typography variant="subtitle1" align="center">
                                Total Late: {totalArriveLate}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="subtitle1" align="center">
                                Total Leave Early: {totalLeaveEarly} </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="subtitle1" align="center">
                                Total Absent {totalAbsent} </Typography>
                        </Grid>

                    </Grid>
                    {/* <Grid item container xs={12} justifyContent="center" alignContent="center">
                    <Grid item xs={3}>
                        {totalWorkHours}
                    </Grid>
                    <Grid item xs={3}>
                        {totalArriveLate}
                    </Grid>
                    <Grid item xs={3}>
                        {totalLeaveEarly}
                    </Grid>
                    <Grid item xs={3}>
                        {totalAbsent}
                    </Grid>
                </Grid> */}

                    <Grid item> <GridFooter hideFooterRowCount={false} >
                    </GridFooter></Grid>
                </Grid>
            </GridPanelFooter>


        </GridFooterContainer>
    );
}

class StaffReportPage extends React.Component {

    constructor(props) {
        super(props);

        let fromDate = getFirstDayOfWeek(new Date());
        let toDate = new Date();
        this.init = {
            fromDate, toDate
        };

        this.state = {
            dateStart: startOfWeek(new Date(), {
                weekStartsOn: 1
            }),
            fromDate: fromDate,
            toDate: toDate,
            selectedIndexUser: -1,
            staffs: null,
            tabIndex: 0
        };
    }
    
    initData = async () => {
        var staffs = await getStaffs();
        console.log(staffs);
        if (_.isEmpty(staffs)) return;

        this.setState({
            staffs: staffs,
            currentUsername: staffs[0].username,
            selectedIndexUser: 0
        });

        this.props.fetchStaffReport(staffs[0].username, this.state.fromDate, this.state.toDate);
    }
    componentDidMount = async () => {
        this.initData();
    }
    componentDidUpdate = async () => {
        if (!this.state.staffs) {
            this.initData();
        }

        if (this.state.updateData) {
            this.props.fetchStaffReport(this.state.currentUsername, this.state.fromDate, this.state.toDate);
            this.setState({ updateData: false });
        }
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

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Card style={{ padding: '12px', paddingLeft: 18, marginBottom: '16px' }} elevation={0}>
                    <Typography variant="h3">Staff Timesheet</Typography>
                    <Box height={16}></Box>
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

                    </Grid>

                </Card>
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={2}>
                        <Paper className={this.props.classes.container} style={{ height: "75vh", padding: "16px 12px" }} elevation={0}>
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
                    <Grid item xs={10}>
                        <Paper style={{ height: "75vh", padding: 12 }}>
                            <Typography variant="h2" style={{ padding: 12 }}>
                                Staff: {this.state.currentUsername}
                            </Typography>
                            <div style={{ height: "65vh" }}>
                                <DataGrid

                                    rows={this.props.records}
                                    columns={columns}
                                    components={{
                                        Toolbar: CustomToolbar,
                                        Footer: CustomFooter,
                                    }}
                                    componentsProps={{
                                        footer: this.props.summary
                                    }}

                                    pageSize={10}
                                    disableSelectionOnClick
                                />
                            </div>
                        </Paper>
                    </Grid>
                </Grid>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        records: state.reportStaff.records,
        summary: state.reportStaff.summary
    }
}
export default connect(
    mapStateToProps,
    {
        fetchStaffReport
    }
)(withStyles(styles, { withTheme: true })(StaffReportPage));