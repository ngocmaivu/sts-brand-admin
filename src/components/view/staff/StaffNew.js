import { Snackbar, CardHeader, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormLabel, Grid, makeStyles, MenuItem, OutlinedInput, Paper, Select, TextField, Typography, useTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { CardCustom } from '../../CardCustom';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import StaffForm from './StaffForm';
import { connect } from 'react-redux';
import { loadStaffNew, createStaff } from '../../../_actions'
import { Skeleton } from '@material-ui/lab';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    container: {

    },
    containerContent: {
        padding: "40px 30px"
    },
    input: {

    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function StaffNew(props) {

    const classes = useStyles();


    const onSubmit = (data) => {
        props.createStaff(data);
        setSuccessAlert(true);
    }
    // const [initData, setInitData] = useState({});
    useEffect(
        () => {
            props.loadStaffNew();
        }, []
    );

    console.log({ ...props.initialValues });

    const [openSuccessAlert, setSuccessAlert] = React.useState(false);

    return (

        <Paper className={classes.container}>
            <Snackbar open={openSuccessAlert} autoHideDuration={6000} onClose={() => { setSuccessAlert(false); }}>
                <Alert onClose={() => { setSuccessAlert(false); }} severity="success">
                    Update success!
                </Alert>
            </Snackbar>
            <CardHeader title={
                <Typography variant="h2">
                    Add New Staff
                </Typography>
            } disableTypography={true}
            />
            {!props.initialValues || Object.keys(props.initialValues).length == 0 ? <div>
                <Grid container spacing={2} direction="column" style={{ padding: 20 }}>
                    <Grid item xs>
                        <Skeleton animation="wave" variant="rect" height="200px" />
                    </Grid>
                    <Grid item xs>
                        <Skeleton animation="wave" variant="rect" height="150px" />
                    </Grid>
                    <Grid item xs>
                        <Skeleton animation="wave" variant="rect" height="50px" />
                    </Grid>
                    <Grid item xs>
                        <Skeleton animation="wave" variant="rect" height="20px" />
                    </Grid>
                    <Grid item xs>
                        <Skeleton animation="wave" variant="rect" height="20px" />
                    </Grid>
                </Grid>

            </div> : <StaffForm onSubmit={onSubmit} skills={props.skills} stores={props.stores}
                initialValues={{ ...props.initialValues, }} />}

        </Paper >
    );
}



const mapStateToProps = (state) => {



    return {
        initialValues: state.staffs.data,
        skills: state.staffs.skills,

        stores: state.staffs.stores
    };
}


export default connect(mapStateToProps, {
    loadStaffNew, createStaff
})(StaffNew);