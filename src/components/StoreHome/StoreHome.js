import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStyles, withStyles, Card, Grid, Typography, Button, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { AccountTreeTwoTone, LocalCafeSharp, LocationOffOutlined, LocationOn, Mail, MailOutline, Phone, Settings, Store, WatchLaterRounded } from '@material-ui/icons';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import { brandActions, storeActions, userActions } from '../../_actions';

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

class StoreHome extends React.Component {
    componentDidMount() {

        this.props.getByUserName();
        this.props.getBrandByID();
        this.props.getStoreById();
    }
    render() {
        const { classes, users, brand, stores } = this.props;
        console.log(brand)
        if (!this.props.users.items || !this.props.brand.items || !this.props.stores.items) {
            return <p>...Loading</p>;
        }
        return (
            <React.Fragment>
                <Card style={{ padding: '10px', marginBottom: '20px' }}>
                    <h1>Welcome to  {stores.items.name}</h1>
                </Card>



                <Card style={{ padding: '10px', backgroundColor: '' }}>

                    <br /><br />
                    <Typography variant="h4"> <AccountCircleRoundedIcon style={{ color: '#006241', marginBottom: '-3px' }} /> Store Manager: {users.items.lastName} {users.items.firstName}</Typography>
                    <br />
                    <Typography variant="h4"> <LocationOn style={{ color: 'red', marginBottom: '-3px' }} /> Store Name: {stores.items.name}</Typography>
                    <br />
                    <Typography variant="h4"> <LocationOn style={{ color: 'red', marginBottom: '-3px' }} /> Address: {stores.items.address}</Typography>
                    <br />
                    <Typography variant="h4"> <Phone style={{ color: '#006241', marginBottom: '-3px' }} /> Number phone: {stores.items.phone}</Typography>
                    <br />

                </Card>


            </React.Fragment>
        );
    }
}
const mapStateToProps = (state) => {
    const { users, brand, stores } = state
    return { users, brand, stores };
}

export default connect(mapStateToProps, {
    getByUserName: userActions.getByUserName,
    getBrandByID: brandActions.getById,
    getStoreById: storeActions.getById,
})(withStyles(styles, { withTheme: true })(StoreHome));

