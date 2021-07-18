import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { connect } from 'react-redux';
import { Button, createStyles, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, InputAdornment, TextField, withStyles, Paper, Card } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AddIcon from '@material-ui/icons/Add';
import MuiAlert from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom';
// import { users } from "../../../dataTest/user"
import { storeActions } from '../../_actions';
import { Delete, Edit, ImageSearch, ImageSearchTwoTone, SearchTwoTone, ViewAgenda, ViewStreamOutlined } from '@material-ui/icons';
import { store } from '../../_helpers';
import { isThisSecond } from 'date-fns';
import { KeyboardDatePicker } from '@material-ui/pickers';

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
})
var deleting = false;

class StoreTimekeeping extends React.Component {

    componentDidMount() {
        // this.props.getAllByPage();
    }
    state = {
        searchValue: '', openDeleteDialog: false, deleteUserId: null, openAddDialog: false,
        pageSize: 10, rowCount: 0, pageIndex: 1, open: true, setOpen: false,
        selectedDate: '2014-08-18T21:11:54',
    };

    handleDateChange = (date) => {
        this.state.selectedDate = date
    };

    handleSearchValueChange = (event) => {
        this.setState({ searchValue: event.target.value });
    }

    handleSearchSubmit = (e) => { }

    handleDeleteStore(id) {
        return (e) => { this.props.deleteStore(id); deleting = true }
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
    handlePageSizeChange = (params) => {
    };

    handleClick = (id) => {
        this.props.deleteStore(id);

    };


    render() {
        // const { StoreTimekeeping, type} = this.props;

        const data = [
            { id: 2, name: "Chi Nhanh 1", address: "abc", date: "023578951" },
            { id: 3, name: "Chi Nhanh 1", address: "Quan Phu Nhuan", date: "023578951" },
            { id: 1, name: "Effoc 1", address: "676 Le Duan", date: "098987667" },
        ]
        const columns = [
            { field: 'id', headerName: 'User ID', width: 200 },
            { field: 'name', headerName: 'Name', width: 300 },
            { field: 'address', headerName: 'Address', width: 300 },
            { field: 'date', headerName: 'Date', width: 200 },
            {
                field: 'action', headerName: "Actions", flex: 0.3, sortable: false, filterable: false,
                headerAlign: 'center',
                width: 50,
                renderCell: (params) => {

                    return (<span>
                        <Button color='primary'> <Edit fontSize='small' /></Button>
                        {/* <Button onClick={this.handleDeleteStore(params.id)} style={{ color: 'red' }}> <Delete fontSize='small' /></Button> */}
                    </span>);
                }
            }
        ];

        // if (!this.props.StoreTimekeeping.items) {
        //     return <p>...Loading</p>;
        // }
        return (
            <React.Fragment>
                <Card style={{ padding: '10px', marginBottom: '15px' }}>
                    <div> <h1>Store Timekeeping Page</h1> </div>
                    {/* <form noValidate>
                        <TextField
                            id="date"
                            label="Date From"
                            type="date"
                            defaultValue="2017-05-24"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
-
                        <TextField
                            id="date"
                            label="Date To"
                            type="date"
                            defaultValue="2017-05-24"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </form> */}
                </Card>
                <Paper>
                    {/* <div style={{ height: 452, width: '100%' }}>
                        <DataGrid disableColumnFilter rows={data} columns={columns} rowsPerPageOptions={[10, 20, 50]} pageSize={this.state.pageSize} pagination
                            paginationMode="server" rowCount={100} />
                    </div> */}

                    
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

