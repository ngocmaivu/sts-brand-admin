import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStyles, withStyles, Card, Grid, Typography, Button, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { AccountTreeTwoTone, LocalCafeSharp, LocationOffOutlined, LocationOn, Mail, MailOutline, Phone, Store, WatchLaterRounded } from '@material-ui/icons';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import { userActions } from '../../_actions';

const userInfor = JSON.parse(localStorage.getItem("userInfor"))
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

class Profile extends React.Component {
    componentDidMount() {
        this.props.getByUserName();
    }
    render() {
        const { classes, users } = this.props;
        console.log(users)
        return (
            <React.Fragment>
                <Card style={{ padding: '10px', marginBottom: '20px' }}>
                    <h1>Profile page</h1>
                </Card>
                <Grid container direction="row" spacing={2} style={{ flexWrap: 'nowrap' }}>
                    <Grid xs={12} sm={6} md={6}>
                        <Card style={{ paddingTop: '5px', backgroundColor: '#FFFFCC' }}>
                            <Typography style={{ marginLeft: '60px', }} variant="h3"> <AccountCircleRoundedIcon style={{ color: 'green', marginBottom: '-3px' }} /> Account Profile</Typography>
                            <Card style={{ padding: '10px', backgroundColor: '' }}>

                                <br /><br />
                                <Typography variant="h4"> <AccountCircleRoundedIcon style={{ color: '#006241', marginBottom: '-3px' }} /> Brand Manager: {userInfor.lastName} {userInfor.firstName}</Typography>
                                <br />
                                <Typography variant="h4"> <LocationOn style={{ color: 'red', marginBottom: '-3px' }} /> Address: {userInfor.address}</Typography>
                                <br />
                                <Typography variant="h4"> <Phone style={{ color: '#006241', marginBottom: '-3px' }} /> Number phone: {userInfor.phone}</Typography>
                                <br />
                                <Typography variant="h4"> <MailOutline style={{ color: '#006241', marginBottom: '-3px' }} /> Mail: {userInfor.email}</Typography>
                                <br />
                                <ListItem
                                    className={classes.listItem}
                                    button
                                    component={Link} to="/editprofile"
                                >
                                    <ListItemIcon>
                                        <EditSharpIcon stroke={1.5} size="1.3rem" />
                                    </ListItemIcon>
                                    {/* <Button component={Link} to="/login">Logout </Button> */}
                                    <ListItemText primary={<Typography variant="body2">Edit Account Profile and Change Password</Typography>} />
                                </ListItem>
                            </Card>

                        </Card>
                    </Grid>
                    <Grid xs={12} sm={6} style={{ marginLeft: '10px' }}>
                        <Card style={{ paddingTop: '5px', backgroundColor: '#FFFFCC' }}>
                            <Typography style={{ marginLeft: '60px', }} variant="h3"> <AccountCircleRoundedIcon style={{ color: 'red', marginBottom: '-3px' }} /> Brand Profile</Typography>
                            <Card style={{ padding: '10px' }}>
                                <br /><br />
                                <Typography variant="h4"> <AccountCircleRoundedIcon style={{ color: '#006241', marginBottom: '-3px' }} /> Brand Name: </Typography>
                                <br />
                                <Typography variant="h4"> <LocationOn style={{ color: 'red', marginBottom: '-3px' }} /> Address: </Typography>
                                <br />
                                <Typography variant="h4"> <Phone style={{ color: '#006241', marginBottom: '-3px' }} /> Number phone: </Typography>
                                <br />
                                <Typography variant="h4"> <MailOutline style={{ color: '#006241', marginBottom: '-3px' }} /> Mail: </Typography>
                                <br />
                                <ListItem
                                    className={classes.listItem}
                                    button
                                    // component={Link} to="/editbrand"
                                >
                                    <ListItemIcon>
                                        <EditSharpIcon stroke={1.5} size="1.3rem" />
                                    </ListItemIcon>
                                    {/* <Button component={Link} to="/login">Logout </Button> */}
                                    <ListItemText primary={<Typography variant="body2">Edit Brand Profile and Setting Brand</Typography>} />
                                </ListItem>

                            </Card>
                        </Card>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}
const mapStateToProps = (state) => {
    const {users} = state
    return {users};
}

export default connect(mapStateToProps, {
    getByUserName: userActions.getByUserName,
})(withStyles(styles, { withTheme: true })(Profile));

