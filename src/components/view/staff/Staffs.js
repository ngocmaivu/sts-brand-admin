import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { connect } from 'react-redux';
import { Button, createStyles, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, TextField, withStyles, Paper, Card, Grid, InputAdornment } from '@material-ui/core';
// import { getUsers, deleteUser } from "../actions";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AddIcon from '@material-ui/icons/Add';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import VisibilityOutlined from '@material-ui/icons/VisibilityOutlined';
import AddUser from '../../dialogs/AddUser';
import { Link } from 'react-router-dom';
import { getStaffs, deleteStaff } from '../../../_actions';
import { ControlCameraOutlined, Search } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';

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

class Staffs extends React.Component {

    state = {
        searchValue: this.props.searchValue, openDeleteDialog: false, deleteId: null, openAddDialog: false,
        pageSize: 10, rowCount: 0, pageIndex: 1, loading: false, datas: this.props.users
    };

    handleSearchValueChange = (event) => {
        this.setState({ searchValue: event.target.value });
    }


    handleSearchSubmit = (e) => {
        if (e.which === 13) {
            this.props.getStaffs(this.props.pageIndex, this.props.pageSize, this.state.searchValue);
        }
    }

    componentDidMount() {
        this.props.getStaffs(this.state.pageIndex, this.state.pageSize, this.state.searchValue);
    }

    handlePageChange = (params) => {
        console.log(params);
        if (params.page >= params.pageCount) {
            this.props.getStaffs(1, params.pageSize, this.state.searchValue ? this.state.searchValue : "");
        } else {
            this.props.getStaffs(params.page + 1, params.pageSize, this.state.searchValue ? this.state.searchValue : "");
        }

    };

    handleDeleteStore(id) {
        return (e) => this.props.deleteStaff(id);
    }

    renderToolbar = () => {
        return (
            <div className={this.props.classes.toolbar}>
                <TextField classes={{ 'root': this.props.classes.searchInput }} size='small' label="search" variant="outlined" InputProps={{
                    startAdornment: (<InputAdornment position="end">
                        <SearchOutlinedIcon />
                    </InputAdornment>)
                }}
                    onChange={this.handleSearchValueChange}
                    onKeyPress={this.handleSearchSubmit} />

                <Button variant="outlined" className={this.props.classes.searchButton} component={Link}
                    to="/staff/new"> <AddIcon />ADD STAFF</Button>

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
    }

    handlePageSizeChange = (params) => {
        // setPageSize(params.pageSize);
    };

    getFullName(params) {
        return `${params.getValue(params.id, 'firstName') || ''} ${params.getValue(params.id, 'lastName') || ''
            }`;
    }

    render() {

        const { classes } = this.props;

        const columns = [
            {
                field: 'counterStatus', headerName: 'No', width: 77, align: "center", headerAlign: 'center', headerClassName: 'header-table', filterable: false, sortable: false,
            },
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

            {
                field: 'action', headerName: "Actions", flex: 0.5, sortable: false, filterable: false,
                align: "center", headerAlign: 'center',

                renderCell: (params) => {
                    const onClick = () => {
                        console.log(params);
                        this.setState({ openDeleteDialog: true, deleteId: params.id });
                    }

                    return (<span>
                        <Button className={classes.button} variant='outlined' color='primary' component={Link} to={"/staff/info/" + params.id}
                        > <VisibilityOutlined fontSize='small' /></Button>
                        <Button onClick={onClick} className={`${classes.button} ${classes.deleteButton}`} variant='outlined'> <CloseOutlinedIcon fontSize='small' /></Button>
                    </span>);
                }

            }
        ];

        return (
            <React.Fragment><Card style={{ padding: '10px', marginBottom: '15px' }}>
                <div> <h1>Staffs page</h1> {this.renderToolbar()}</div>
            </Card>
                <Paper className={this.props.classes.container}>
                    <div style={{ height: 480, width: '100%' }}>
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
                        page={this.props.pageIndex - 1}
                        paginationMode="server" rowCount={this.props.rowCount} 
                        onPageChange={this.handlePageChange} onPageSizeChange={this.handlePageChange}/>}

                    </div>
                    {this.renderDeleteDialog()}
                    <AddUser open={this.state.openAddDialog} handleClose={() => { this.setState({ openAddDialog: false }) }} />
                </Paper>
            </React.Fragment>


        );
    }
}
function mapState(state) {

    return { datas: Object.values(state.staffs.datas), rowCount: state.staffs.totalCount, 
        pageIndex: state.staffs.currentPage, pageSize: state.staffs.pageSize, };
}

export default connect(mapState, {
    getStaffs: getStaffs,
    deleteStaff: deleteStaff

})(withStyles(styles, { withTheme: true })(Staffs));

