import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { connect } from 'react-redux';
import { Button, createStyles, Dialog, DialogContent, TableCell, DialogContentText, DialogTitle, DialogActions, InputAdornment, TextField, withStyles, Paper, Card, Grid, TableContainer, Table, TableHead, TableRow, TableBody, IconButton, Collapse } from '@material-ui/core';

import MuiAlert from '@material-ui/lab/Alert';
import { Delete, Edit, ImageSearch, ImageSearchTwoTone, SearchTwoTone, ViewAgenda, ViewStreamOutlined, VisibilityOutlined } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import { DateRangePicker, DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import { TimeKeepingRow } from './TimeKeepingRow';


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
                    skillId: 1,
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
                    skillId: 1,
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
                    skillId: 1,
                }
            },
            {
                shiftAssignmentId: 4,
                timeCheckIn: null,
                timeCheckOut: null,
                shiftAssignment: {
                    id: 3,
                    timeStart: "2021-07-15T08:00:34",
                    timeEnd: "2021-07-15T17:00:34",
                    skillId: 1,
                }
            },
            {
                shiftAssignmentId: 4,
                timeCheckIn: "2021-07-16T08:00:34",
                timeCheckOut: "2021-07-16T16:59:34",
                shiftAssignment: {
                    id: 4,
                    timeStart: "2021-07-16T08:00:34",
                    timeEnd: "2021-07-16T17:00:34",
                    skillId: 1,
                }
            }
        ]
    },
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
                    skillId: 1,
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
                    skillId: 1,
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
                    skillId: 1,
                }
            },
            {
                shiftAssignmentId: 4,
                timeCheckIn: null,
                timeCheckOut: null,
                shiftAssignment: {
                    id: 3,
                    timeStart: "2021-07-15T08:00:34",
                    timeEnd: "2021-07-15T17:00:34",
                    skillId: 1,
                }
            },
            {
                shiftAssignmentId: 4,
                timeCheckIn: "2021-07-16T08:00:34",
                timeCheckOut: "2021-07-16T16:59:34",
                shiftAssignment: {
                    id: 4,
                    timeStart: "2021-07-16T08:00:34",
                    timeEnd: "2021-07-16T17:00:34",
                    skillId: 1,
                }
            }
        ]
    }
]

class StoreTimekeeping extends React.Component {


    state = {
        searchValue: '', openDeleteDialog: false, deleteUserId: null, openAddDialog: false,
        pageSize: 10, rowCount: 0, pageIndex: 1, open: true, setOpen: false,
        selectedDate: '2014-08-18T21:11:54',
    };
    constructor(props) {
        super(props);

        this.dataSrc = dataSrc;

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
    // {
    //     shiftAssignmentId: 1,
    //     timeCheckIn: "2021-07-13T08:04:34",
    //     timeCheckOut: "2021-07-13T17:04:34",
    //     shiftAssignment: {
    //         id: 1,
    //         timeStart: "2021-07-13T08:00:34",
    //         timeEnd: "2021-07-13T17:00:34",
    //         skillId: 1,
    //     }
    // }

    renderRows = () => {

        return this.dataSrc.map(user => {

            return (
                <TimeKeepingRow user={user} />);
        });
    };

    render() {

        const { classes } = this.props;

        return (
            <React.Fragment>
                <Card style={{ padding: '10px', marginBottom: '15px' }}>
                    <div> <h1>Timekeeping</h1> {this.renderToolbar()}</div>
                    <DateRangePickerComponent />
                </Card>
                <Paper className={this.props.classes.container}>
                    <div style={{ height: 480, width: '100%' }}>
                        {false ? (

                            <Grid container spacing={2} direction="column" style={{ padding: 20 }}>
                                <Grid item xs>
                                    <Skeleton animation="wave" variant="rect" height="175" />
                                </Grid>
                                <Grid item xs>
                                    <Skeleton animation="wave" variant="rect" height="120" />
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

                        ) :
                            <TableContainer>
                                <Table aria-label="simple table" >
                                    <TableHead>
                                        <TableRow >
                                            <TableCell align="left" variant="head" >Username</TableCell>
                                            <TableCell align="left" variant="head" >Fullname</TableCell>
                                            <TableCell align="center">Total Hours</TableCell>
                                            <TableCell align="center">Total Shift</TableCell>
                                            <TableCell align="center">Attendance</TableCell>
                                            <TableCell align="center">Come Lately</TableCell>
                                            <TableCell align="center">Leave Early</TableCell>
                                            <TableCell align="center"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {

                                        <TableBody>
                                            {
                                                this.renderRows()
                                            }
                                        </TableBody>


                                    }

                                </Table>
                            </TableContainer>}

                    </div>


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

