import { Snackbar, CardHeader, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormLabel, Grid, makeStyles, MenuItem, OutlinedInput, Paper, Select, TextField, Typography, useTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { CardCustom } from '../../CardCustom';
import { Link, useParams } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import StaffForm from './StaffForm';
import { connect } from 'react-redux';
import { getStaffInfo, createStaff } from '../../../_actions'
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

function StaffEdit(props) {

    const classes = useStyles();
    const [initialValues, setInitialValues] = useState(null);

    const { id } = useParams();
    const onSubmit = (data) => {
        props.createStaff(data);
        setSuccessAlert(true);
    }
    // const [initData, setInitData] = useState({});
    useEffect(
        () => {
            props.getStaffInfo(id);
        }, []
    );


    useEffect(
        () => {
            if (props.staffData) {
                let skillData = {};
                props.staffData.staffSkills.forEach(skill => {
                    skillData[`skill${skill.skillId}Level`] = skill.level;
                    skillData[`skill${skill.skillId}`] = true
                });
                let tmp = {
                    ...props.staffData.generalInfo,
                    workAt: props.staffData.jobInformations[0].storeId,
                    ...skillData
                }

                setInitialValues(tmp);
            }

        }, [props.staffData]
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
                    Edit Staff: {id}
                </Typography>
            } disableTypography={true}
            />
            {!initialValues || Object.keys(initialValues).length == 0 ? <div>
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
                skillLevels={props.skillLevels}
                initialValues={{ ...initialValues, }} />}

        </Paper >
    );
}


const skillLevels = [
    { value: 0, title: "Beginner" },
    { value: 1, title: "Immegiate" },
    { value: 2, title: "Experience" },
];

const mapStateToProps = (state) => {

    return {
        staffData: state.staffs.data,
        skills: state.staffs.skills,
        skillLevels: skillLevels,
        stores: state.staffs.stores
    };
}


export default connect(mapStateToProps, {
    getStaffInfo, createStaff
})(StaffEdit);