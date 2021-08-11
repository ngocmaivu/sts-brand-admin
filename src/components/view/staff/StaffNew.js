import { Snackbar, CardHeader, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import StaffForm from './StaffForm';
import { connect } from 'react-redux';
import { loadStaffNew, createStaff, clearAlert } from '../../../_actions'
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
        props.clearAlert();
        props.createStaff(data);
    }
    // const [initData, setInitData] = useState({});
    useEffect(
        () => {
            props.loadStaffNew();
        }, []
    );

    useEffect(
        () => {
            setErrorAlert(props.isError);
            setSuccessAlert(props.isSuccess);
        }, [props.isError, props.isSuccess]
    );

    console.log({ ...props.initialValues });

    const [openSuccessAlert, setSuccessAlert] = React.useState(false);
    const [openErrorAlert, setErrorAlert] = React.useState(false);
    return (

        <Paper className={classes.container}>
            <Snackbar open={openSuccessAlert} autoHideDuration={6000} onClose={() => { setSuccessAlert(false); }}>
                <Alert onClose={() => { setSuccessAlert(false); }} severity="success">
                    Create staff success!
                </Alert>
            </Snackbar>
            <Snackbar open={openErrorAlert} autoHideDuration={6000} onClose={() => { setErrorAlert(false); }}>
                <Alert onClose={() => { setErrorAlert(false); }} severity="error">
                    Invalid Username!
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
                initialValues={{ ...props.initialValues, }} type="create" />}

        </Paper >
    );
}



const mapStateToProps = (state) => {

    return {
        initialValues: state.staffs.data,
        skills: state.staffs.skills,
        stores: state.staffs.stores,
        isError: state.staffs.isError,
        isSuccess: state.staffs.isSuccess,
    };
}


export default connect(mapStateToProps, {
    loadStaffNew, createStaff, clearAlert
})(StaffNew);