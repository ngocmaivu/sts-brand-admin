import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../_actions';
import { AppBar, Button, CssBaseline, IconButton, InputBase, TextField, Toolbar, Typography } from '@material-ui/core';
import { MenuOutlined, SearchOutlined, Edit, Delete } from '@material-ui/icons'
import { DataGrid } from '@material-ui/data-grid';

const columns = [
    { field: 'id', headerName: 'Store ID', width: 160 },
    { field: 'address', headerName: 'Address', width: 270 },
    { field: 'email', headerName: 'Email', width: 190 },
    {
        field: 'hotline',
        headerName: 'Hotline',
        type: 'number',
        width: 150,
    },
    {
        field: 'storeManager',
        headerName: 'Store Manager',
        width: 200,
    },
    {
        field: 'stt',
        headerName: 'Status',
        width: 150,
    },
    {
        field: 'Edit',
        headerName: ' ',
        width: 110,
        disableClickEventBubbling: true,
        renderCell: () => {
            return (
              <Button variant="contained" color="primary" startIcon={<Edit />}>
                Edit
              </Button>
            );
          }
    },
    {
        field: 'delete',
        headerName: ' ',
        width: 110,
        disableClickEventBubbling: true,
        renderCell: () => {
            return (
              <Button
                variant="contained"
                color="secondary"
                startIcon={<Delete />}
              >
                Delete
              </Button>
            );
          }
    },
];
const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];
const hiStyle = {
    // marginLeft: '600px',
    textAlign: 'right',
    fontSize: '60',
    color: 'black',
};
const linkStyle = {
    // backgroundColor: 'black',
    color: 'black',
}
const appbarStyle = {
    backgroundColor: 'pink',
    fontSize: '60px',
}
const bodyStyle = {
    // backgroundColor: 'pink',
    fontSize: '60px',
    marginTop: '20px',
}
class BrandManagePage extends React.Component {
    componentDidMount() {
        this.props.getUsers();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }
    render() {
        const { user, users } = this.props;

        return (
            <div>

                <AppBar position='fixed' style={appbarStyle}>
                    <Toolbar>
                        {/* <IconButton edge="start" color="inherit" aria-label="menu" >
                                <MenuOutlined />
                            </IconButton> */}
                        <IconButton><Link to="/managebrand" className="btn btn-link" style={linkStyle}>Brand</Link></IconButton>
                        <IconButton><Link to="/managestores" className="btn btn-link" style={linkStyle}>Stores</Link></IconButton>
                        <IconButton><Link to="/manageemployees" className="btn btn-link" style={linkStyle}>Employees</Link></IconButton>
                        <IconButton><Link to="/profile" className="btn btn-link" style={linkStyle}>Profile</Link></IconButton>
                        <SearchOutlined />
                        <InputBase
                            placeholder="Search…"
                        />
                        <div className="col-md-6 col-md-offset-5" style={hiStyle}>
                            <Typography variant="h5" >Hi {user.firstName}!</Typography>
                        </div>

                    </Toolbar>
                </AppBar>
                <Toolbar />
                <body style={bodyStyle}>
                <h2 style={{textAlign: 'center',}}>Manage Brand</h2>
                    <div style={{ height: 400, width: '95%', marginLeft: '40px' }}>
                        <DataGrid rows={rows} columns={columns} pageSize={5} />
                    </div>
                </body>


            </div>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedBrandManagePage = connect(mapState, actionCreators)(BrandManagePage);
export { connectedBrandManagePage as BrandManagePage };