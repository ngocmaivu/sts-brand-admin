import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { connect } from 'react-redux';
import { Button, createStyles, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, InputAdornment, TextField, withStyles, Paper, Card } from '@material-ui/core';
// import { getUsers, deleteUser } from "../actions";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AddIcon from '@material-ui/icons/Add';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import VisibilityOutlined from '@material-ui/icons/VisibilityOutlined';
import AddUser from '../dialogs/AddUser';
import { Link } from 'react-router-dom';
// import { users } from "../../../dataTest/user"
import { storeActions } from '../../_actions';
import { Delete, Edit, ImageSearch, ImageSearchTwoTone, SearchTwoTone, ViewAgenda, ViewStreamOutlined } from '@material-ui/icons';
import { store } from '../../_helpers';

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


class Stores extends React.Component {

    componentDidMount() {
        // this.props.getAllByPage(this.state.pageIndex,this.state.pageSize);
        this.props.getAllByPage();
    }
    state = {
        searchValue: '', openDeleteDialog: false, deleteUserId: null, openAddDialog: false,
        pageSize: 10, rowCount: 0, pageIndex: 1,
    };

    handleSearchValueChange = (event) => {
        this.setState({ searchValue: event.target.value });
    }

    handleSearchSubmit = (e) => { }
    

   
    handleDeleteStore(id) {
        return (e) => this.props.deleteStore(id);
    }

    renderToolbar = () => {
        return (
            <div className={this.props.classes.toolbar}>
                <TextField style={{ height: '40px', width: '600px' }} placeholder="search" size='small' variant="outlined"
                 />
                {/* <SearchOutlinedIcon style={{marginLeft: '-350px', color: '#50A625'}} /> */}
                <Button style={{marginLeft: '-350px', color: '#009966'}}> <SearchTwoTone fontSize='small' /></Button>
                <Button variant="outlined" className={this.props.classes.searchButton} component={Link}
                    to="/stores/new"> <AddIcon />Add Store</Button>
            </div>
        );
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
                        {`Do you want to delete user: ${this.state.deleteUserId}`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => {this.handleDeleteStore(store.id)}} >
                        Confirm
                    </Button>

                </DialogActions>
            </Dialog>
        );
    }

    handlePageSizeChange = (params) => {
    };


    render() {
        const {stores}  = this.props;
        const columns = [
            { field: 'id', headerName: 'Store ID', width: 200 },
            { field: 'name', headerName: 'Name', width: 300 },
            { field: 'address', headerName: 'Address', width: 300 },
            {
                field: 'phone',
                headerName: 'Phone',
                width: 200,
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
                width: 50,
                renderCell: (params) => {
                    // const onClick = () => {
                    //     this.setState({ openDeleteDialog: true, deleteUserId: params.getValue('id') });
                    // }
                    // console.log(params.id)
                    return (<span>
                        <Button color='primary' component={Link} to="/changeStoreManager/"> <Edit fontSize='small' /></Button>
                        {/* <Button color='primary' component={Link} to="/changeStoreManager/"> < fontSize='small' /></Button> */}
                        <Button onClick={this.handleDeleteStore(params.id)} style={{color: 'red'}}> <Delete fontSize='small' /></Button>
                    </span>);
                }

            }
        ];

        if (!this.props.stores.items) {
            return <p>...Loading</p>;
        }
        // var items = JSON.parse(localStorage.getItem("stores"));
        // console.log(stores.items)
        return (
            <React.Fragment>
                <Card style={{ padding: '10px', marginBottom: '15px' }}>
                   <div> <h1>Store page</h1> {this.renderToolbar()}</div>
                </Card>
                <Paper className={this.props.classes.container}>

                   
                    <div style={{ height: 452, width: '100%' }}>
                        <DataGrid disableColumnFilter rows={stores.items} columns={columns} rowsPerPageOptions={[10, 20, 50]} pageSize={this.state.pageSize} pagination
                            paginationMode="server" rowCount={100} />
                    </div>
                </Paper>
            </React.Fragment>

        );
    }
}
function mapState(state) {
    const { stores } = state;
    return {stores};
}

export default connect(mapState, {
    getAllByPage: storeActions.getAllByPage,
    deleteStore: storeActions.delete

})(withStyles(styles, { withTheme: true })(Stores));

