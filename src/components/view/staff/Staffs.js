import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { connect } from 'react-redux';
import { Button, createStyles, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, TextField, withStyles, Paper, Card } from '@material-ui/core';
// import { getUsers, deleteUser } from "../actions";
// import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AddIcon from '@material-ui/icons/Add';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import VisibilityOutlined from '@material-ui/icons/VisibilityOutlined';
import AddUser from '../../dialogs/AddUser';
import { Link } from 'react-router-dom';
import { userActions } from '../../../_actions';
import { Search } from '@material-ui/icons';

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

const dataTable = [
    { id: 2, name: "Chi Nhanh 1", address: "abc", phone: "023578951" },
    { id: 3, name: "Chi Nhanh 1", address: "Quan Phu Nhuan", phone: "023578951" },
    { id: 1, name: "Effoc 1", address: "676 Le Duan", phone: "098987667" },
]

class Staffs extends React.Component {

    state = {
<<<<<<< HEAD
        searchValue: this.props.searchValue, openDeleteDialog: false, deleteId: null, openAddDialog: false,
        pageSize: 10, rowCount: 0, pageIndex: 1, loading: false, datas: this.props.users
=======
        searchValue: '', openDeleteDialog: false, deleteUserId: null, openAddDialog: false,
        pageSize: 10, rowCount: 0, pageIndex: 1, loading: false,
>>>>>>> parent of 6e10fd6 (push)
    };

    handleSearchValueChange = (event) => {
        this.setState({ searchValue: event.target.value });
    }

    handleSearchSubmit = (e) => { }
    componentDidMount() {
        // this.props.getAllByPage(this.state.pageIndex,this.state.pageSize);
        this.props.getAll();
    }

    handleDeleteStore(id) {
        return (e) => this.props.deleteUser(id);
    }

    renderToolbar = () => {
        return (
            <div className={this.props.classes.toolbar}>
                <TextField style={{ height: '40px', width: '600px' }} placeholder="search" size='small' variant="outlined"/>
                {/* <SearchOutlinedIcon style={{marginLeft: '-350px', color: '#50A625'}} /> */}
                <Button style={{ marginLeft: '-350px', color: '#009966' }}> <Search fontSize='small' /></Button>

                <Button variant="outlined" className={this.props.classes.searchButton} component={Link}
                    to="/staff/new"> <AddIcon />ADD STAFF</Button>

            </div>
        );
    }

    renderDeleteDialog = () => {

        const handleClose = () => {
            this.setState({ openDeleteDialog: false });
        }

<<<<<<< HEAD
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
                        {`Do you want to delete user: ${this.state.deleteId}`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => { this.props.deleteStaff(this.state.deleteId); this.setState({ deleteId: null }); handleClose(); }} color="primary" autoFocus>
                        Confirm
                    </Button>

                </DialogActions>
            </Dialog>
        );
=======
//         return (
//             <Dialog
//                 open={this.state.openDeleteDialog}
//                 onClose={handleClose}
//                 aria-labelledby="alert-dialog-title"
//                 aria-describedby="alert-dialog-description"
//             >
//                 <DialogTitle id="alert-dialog-title">{"Delete Dialog?"}</DialogTitle>
//                 <DialogContent>
//                     <DialogContentText id="alert-dialog-description">
//                         {`Do you want to delete user: ${this.state.deleteUserId}`}
//                     </DialogContentText>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose} color="primary">
//                         Cancel
//                     </Button>
//                     <Button onClick={() => { this.props.deleteUser(this.state.deleteUserId); this.setState({ deleteUserId: null }); handleClose(); }} color="primary" autoFocus>
//                         Confirm
//                     </Button>

//                 </DialogActions>
//             </Dialog>
//         );
>>>>>>> parent of 6e10fd6 (push)
    }

    handlePageSizeChange = (params) => {
        // setPageSize(params.pageSize);
    };

    getFullName(params) {
        return `${params.getValue(params.id, 'firstName') || ''} ${params.getValue(params.id, 'lastName') || ''
            }`;
    }

    render() {
// <<<<<<< cuong
//         console.log(localStorage.getItem("jwt_decode"));
//         const { classes, stores } = this.props;
// =======
        const { classes, users } = this.props;
// >>>>>>> main
        const columns = [
            { field: 'userName', headerName: 'User Name', width: 150 },
            { field: 'name', headerName: 'Staff Name', width: 250 },
            { field: 'address', headerName: 'Address', width: 200 },
            {
                field: 'phone',
                headerName: 'Phone',
                // type: 'number',
                width: 150,
            },
<<<<<<< HEAD
            { field: 'username', headerName: 'User Name', flex: 1, align: "left", headerAlign: 'left', },
            {
                field: 'fullname', headerName: 'Full name', flex: 0.5, valueGetter: this.getFullName
            },
            {
                field: 'dateStart', headerName: 'Hire On', flex: 1, align: "center", headerAlign: 'center',
                valueGetter: (params) => {
                    return (new Date(params.value)).toLocaleDateString('en-GB');
                }
            },
            {
                field: 'email', headerName: 'Email', width: 250, headerAlign: 'center',
            },
=======
            { field: 'store', headerName: 'Store', width: 150 },
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
>>>>>>> parent of 6e10fd6 (push)

            {
                field: 'action', headerName: "Actions", flex: 0.3, sortable: false, filterable: false,
                headerAlign: 'center',

                renderCell: (params) => {
                    const onClick = () => {
<<<<<<< HEAD
                        console.log(params);
                        this.setState({ openDeleteDialog: true, deleteId: params.id });
=======
                        this.setState({ openDeleteDialog: true, deleteUserId: params.getValue('id') });
>>>>>>> parent of 6e10fd6 (push)
                    }

                    return (<span>
                        <Button className={classes.button} variant='outlined' color='primary' component={Link} to={"/staff/info/" + params.id}
                        > <VisibilityOutlined fontSize='small' /></Button>
                        <Button onClick={onClick} className={`${classes.button} ${classes.deleteButton}`} variant='outlined'> <CloseOutlinedIcon fontSize='small' /></Button>
                    </span>);
                }

            }
        ];

        // if (!this.props.stores) {
        //     return <p>...Loading</p>;
        // }
        console.log(users.items)
        return (
            <React.Fragment><Card style={{ padding: '10px', marginBottom: '15px' }}>
                <div> <h1>Staffs page</h1> {this.renderToolbar()}</div>
            </Card>
                <Paper className={this.props.classes.container}>
                    <div style={{ height: 480, width: '100%' }}>
<<<<<<< HEAD
                        {!this.props.datas ? (

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
                        ) : <DataGrid disableColumnFilter rows={this.props.datas} 
                        columns={columns} rowsPerPageOptions={[10, 20, 50]} pageSize={this.state.pageSize} pagination
                            paginationMode="server" rowCount={this.props.rowCount} />}

=======
                        <DataGrid disableColumnFilter rows={dataTable} columns={columns} rowsPerPageOptions={[10, 20, 50]} pageSize={this.state.pageSize} pagination
                            paginationMode="server" rowCount={100} />
>>>>>>> parent of 6e10fd6 (push)
                    </div>
                    {this.renderDeleteDialog()}
                    <AddUser open={this.state.openAddDialog} handleClose={() => { this.setState({ openAddDialog: false }) }} />
                </Paper>
            </React.Fragment>


        );
    }
}
function mapState(state) {
    const { users } = state;
    return {users};
}

export default connect(mapState, {
    getAll: userActions.getAll,
    deleteStaff: userActions.delete

})(withStyles(styles, { withTheme: true })(Staffs));

