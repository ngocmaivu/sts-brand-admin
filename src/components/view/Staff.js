import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { connect } from 'react-redux';
import { Button, Container, createStyles, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, InputAdornment, TextField, withStyles, Paper } from '@material-ui/core';
// import { getUsers, deleteUser } from "../actions";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AddIcon from '@material-ui/icons/Add';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import VisibilityOutlined from '@material-ui/icons/VisibilityOutlined';
import AddUser from '../dialogs/AddUser';
import { Link } from 'react-router-dom';
import { users } from "../../dataTest/user"

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

class Staffs extends React.Component {

    state = {
        searchValue: '', openDeleteDialog: false, deleteUserId: null, openAddDialog: false,
        pageSize: 10, rowCount: 0, pageIndex: 0, loading: false, datas: this.props.users
    };

    handleSearchValueChange = (event) => {
        this.setState({ searchValue: event.target.value });
    }

    handleSearchSubmit = (e) => {
        if (e.which == 13) {
            console.log('enter');
        }
    }
    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.pageSize !== this.state.pageSize || prevState.pageIndex !== this.state.pageIndex) {
            const { searchValue, pageSize, pageIndex } = this.state;
            const response = this.loadData(searchValue, pageSize, pageIndex);
        }
    }

    loadData = (search, pageSize, pageIndex) => {
        return {};
    }



    renderToolbar = () => {
        return (
            <div className={this.props.classes.toolbar}>
                <TextField classes={{ 'root': this.props.classes.searchInput }} size='small' label="search" variant="outlined" InputProps={{
                    startAdornment: (<InputAdornment position="end">
                        <SearchOutlinedIcon />
                    </InputAdornment>)
                }} value={this.state.searchValue}
                    onChange={this.handleSearchValueChange}
                    onKeyPress={this.handleSearchSubmit} />

                <Button variant="outlined" className={this.props.classes.searchButton} component={Link}
                    to="/staffs/new"> <AddIcon />Add Staff</Button>
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
                    <Button onClick={() => { this.props.deleteUser(this.state.deleteUserId); this.setState({ deleteUserId: null }); handleClose(); }} color="primary" autoFocus>
                        Confirm
  </Button>

                </DialogActions>
            </Dialog>
        );
    }

    handlePageSizeChange = (params) => {
        // setPageSize(params.pageSize);
    };


    render() {
        const { classes } = this.props;
        const columns = [
            { field: 'id', headerName: 'Staff ID', width: 100 },
            { field: 'staffName', headerName: 'Staff Name', width: 200 },
            { field: 'email', headerName: 'Email', width: 190 },
            {
                field: 'phoneNumber',
                headerName: 'Phone Number',
                // type: 'number',
                width: 180,
            },
            {
                field: 'staffPosision',
                headerName: 'Staff Posision',
                width: 200,
            },
            {
                field: 'store',
                headerName: 'Store',
                width: 150,
            },

            {
                field: 'action', headerName: "Actions", flex: 0.3, sortable: false, filterable: false,
                headerAlign: 'center',

                renderCell: (params) => {
                    const onClick = () => {
                        this.setState({ openDeleteDialog: true, deleteUserId: params.getValue('email') });
                    }

                    return (<span>
                        <Button className={classes.button} variant='outlined' color='primary' component={Link} to="/staffs/1"
                        > <VisibilityOutlined fontSize='small' /></Button>
                        <Button onClick={onClick} className={`${classes.button} ${classes.deleteButton}`} variant='outlined'> <CloseOutlinedIcon fontSize='small' /></Button>
                    </span>);
                }

            }
        ];


        return (
            <Paper className={this.props.classes.container}>
                <h2>Staff</h2>
                {this.renderToolbar()}
                <div style={{ height: 480, width: '100%' }}>
                    <DataGrid disableColumnFilter rows={users} columns={columns} rowsPerPageOptions={[10, 20, 50]} pageSize={this.state.pageSize} pagination
                        paginationMode="server" rowCount={100} />
                </div>
                {this.renderDeleteDialog()}
                <AddUser open={this.state.openAddDialog} handleClose={() => { this.setState({ openAddDialog: false }) }} />
            </Paper>

        );
    }
}
const mapStateToProps = (state) => {
    return {};
}

export default connect(mapStateToProps, {

})(withStyles(styles, { withTheme: true })(Staffs));

