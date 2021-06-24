import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { connect } from 'react-redux';
import { Button, createStyles, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, InputAdornment, TextField, withStyles, Paper } from '@material-ui/core';
// import { getUsers, deleteUser } from "../actions";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AddIcon from '@material-ui/icons/Add';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import VisibilityOutlined from '@material-ui/icons/VisibilityOutlined';
import AddUser from '../dialogs/AddUser';
import { Link } from 'react-router-dom';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import { storeActions } from '../../_actions';
import * as ReactDOM from 'react-dom';

const styles = (Theme) => createStyles({
    root: {
        '& .header-table': {
            backgroundColor: 'rgba(255, 7, 0, 0.55)',
        },
    },

    button: {
        //    backgroundColor:'#FA0000',
        minWidth: 46,
        fontSize: '1em',
        // color: "#FA0000",
        padding: 0,
        // borderColor: '#FA0000',
        marginRight: 5,
        '&:hover': {
            // color: "#FFFFFF",
            // backgroundColor: '#FA0000',
            // borderColor: '#FFFFFF',
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
})


class ViewSchedule extends React.Component {

    constructor() {
        super(...arguments);
        this.data = [{
                Id: 2,
                Subject: 'Paris',
                StartTime: new Date(2018, 1, 15, 10, 0),
                EndTime: new Date(2018, 1, 15, 12, 30),
                IsAllDay: false,
                RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;COUNT=5',
            }];
    }
    state = {
        searchValue: '', openDeleteDialog: false, deleteUserId: null, openAddDialog: false,
        pageSize: 10, rowCount: 0, pageIndex: 1, loading: false, datas: this.props.users
    };

    handleSearchValueChange = (event) => {
        this.setState({ searchValue: event.target.value });
    }

    handleSearchSubmit = (e) => { }
    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    handleDeleteStore(id) {
        return (e) => this.props.deleteUser(id);
    }


    handlePageSizeChange = (params) => {
        // setPageSize(params.pageSize);
    };


    render() {
        const { classes } = this.props;
        const columns = [
            { field: 'id', headerName: 'Store ID', width: 100 },
            { field: 'name', headerName: 'Name', width: 250 },
            { field: 'address', headerName: 'Address', width: 150 },
            {
                field: 'phone',
                headerName: 'Phone',
                // type: 'number',
                width: 150,
            },
            // {
            //     field: 'storeManager',
            //     headerName: 'Store Manager',
            //     width: 200,
            // },
            // {
            //     field: 'stt',
            //     headerName: 'Status',
            //     width: 150,
            // },

            {
                field: 'action', headerName: "Actions", flex: 0.3, sortable: false, filterable: false,
                headerAlign: 'center',

                renderCell: (params) => {
                    const onClick = () => {
                        this.setState({ openDeleteDialog: true, deleteUserId: params.getValue('id') });
                    }

                    return (<span>
                        <Button className={classes.button} variant='outlined' color='primary' component={Link} to="/stores/1"
                        > <VisibilityOutlined fontSize='small' /></Button>
                        <Button onClick={onClick} className={`${classes.button} ${classes.deleteButton}`} variant='outlined'> <CloseOutlinedIcon fontSize='small' /></Button>
                    </span>);
                }

            }
        ];
        return (
            <Paper className={this.props.classes.container}>
                <h2>View Schedule</h2>
                <ScheduleComponent height='550px' selectedDate={new Date(2018, 1, 15)} eventSettings={{ dataSource: this.data }}>
                    <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
                </ScheduleComponent>;
            </Paper>

        );
    }
}
function mapState(state) {
    // const { stores, authentication } = state;
    // const { store } = authentication;
    return { };
}

export default connect(mapState, {

})(withStyles(styles, { withTheme: true })(ViewSchedule));

// ReactDOM.render(<ViewSchedule />, document.getElementById('schedule'));
