import React from 'react';
import { createStyles, withStyles } from '@material-ui/core/styles';

import { fetchStoreReport } from "../../_actions"
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
        field: 'staff',
        headerName: 'Staff',
        flex: 1,
        editable: true,
    },
    {
        field: 'date-1',
        headerName: '1-Aug',
        flex: 1,
        editable: true,
    },
    {
        field: 'date-2',
        headerName: '2-Aug',
        flex: 1,
        editable: true,
    },
    {
        field: 'date-3',
        headerName: '3-Aug',
        flex: 1,
        editable: true,
    },
    {
        field: 'date-4',
        headerName: '4-Aug',
        flex: 1,
        editable: true,
    },
    {
        field: 'date-5',
        headerName: '1-Aug',
        flex: 1,
        editable: true,
    },
    {
        field: 'date-6',
        headerName: '2-Aug',
        flex: 1,
        editable: true,
    },
    {
        field: 'date-7',
        headerName: '3-Aug',
        flex: 1,
        editable: true,
    },
    {
        field: 'checkInLate',
        headerName: 'Check In Late',
        type: 'date',
        flex: 1,
        editable: true,
    },
    {
        field: 'checkOutEarly',
        headerName: 'Check Out Early',
        type: 'date',
        flex: 1,
        editable: true,
    },
    {
        field: 'absent',
        headerName: 'Absent',
        type: 'date',
        flex: 1,
        editable: true,
    },
    {
        field: 'totalHours',
        headerName: 'Total Working Hours',
        type: 'date',
        flex: 1,
        editable: true,
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

function CustomFooter({ storeTotalWorkHours, storeTotalArriveLate,
    storeTotalLeaveEarly, storeTotalAbsent,
    storeTotalLackCheckIn, storeTotalLackCheckOut }) {
    return (
        <GridFooterContainer style={{marginTop: 12}}>
         
            <Grid container >
                <Grid item container xs={12} justify="space-between"
                    justifyContent="center" alignContent="center"
                    alignItems="center" >
                    <Grid item xs={2}
                    >
                        <Typography variant="subtitle1" align="center">
                            Total Working: {storeTotalWorkHours}
                        </Typography>
                    </Grid>
                    <Grid item xs={2} >
                        <Typography variant="subtitle1" align="center">
                            Total Late: {storeTotalArriveLate}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="subtitle1" align="center">
                            Total Leave Early: {storeTotalLeaveEarly} </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="subtitle1" align="center">
                            Total Lack CheckIn {storeTotalLackCheckIn} </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="subtitle1" align="center">
                            Total Lack CheckOut {storeTotalLackCheckOut} </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="subtitle1" align="center">
                            Total Absent {storeTotalAbsent} </Typography>
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



        </GridFooterContainer>
    );
}

class StoreReportPage extends React.Component {
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


    componentDidMount = () => {
        this.props.fetchStoreReport(this.state.fromDate, this.state.toDate);
    }

    componentDidUpdate = () => {
        if (this.state.updateData) {
            this.props.fetchStoreReport(this.state.fromDate, this.state.toDate);
            this.setState({ updateData: false });
        }
    }
    render() {
        return (
            <React.Fragment>
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

                <Paper style={{ height: "78vh", padding: 12 }}>

                    <div style={{ height: "72vh" }}>
                        <DataGrid
                            rows={this.props.records}
                            columns={this.props.columns}
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
            </React.Fragment>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        records: state.reportStore.records,
        summary: state.reportStore.summary,
        columns: state.reportStore.columns,
    }
}
export default connect(
    mapStateToProps,
    {
        fetchStoreReport
    }
)(withStyles(styles, { withTheme: true })(StoreReportPage));