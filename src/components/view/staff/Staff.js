import {
    Box, Button, Card, CardContent, CardHeader, Chip,
    Divider, Grid,
    IconButton,
    LinearProgress, makeStyles, MenuItem, OutlinedInput, Paper, Select, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography, useTheme
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { CardCustom } from '../../CardCustom';

import _ from 'lodash';
import { connect } from 'react-redux';
import { getStaffInfo } from "../../../_actions/staff.action";
import { Link, useParams } from 'react-router-dom';
import { Skeleton } from '@material-ui/lab';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import StaffType from "../../../ultis/StaffType";
import { levelInit, levels, renderLevelLableChip } from "../../../_constants/levelData";
import format from 'date-fns/format';
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
    table: {
        '& td': {
            borderBottom: 'none',
            padding: '6px 16px'
        }
    }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}
const Staff = (props) => {

    const titlePersonals = {
        fullname: "Fullname",
        address: "Address",
        email: "Email",
        phone: "Phone",
        bOd: "Day of birth",
        gender: "Gender",
    }

    const titleJobs = {
        workAt: "Word at",
        dateStart: "Hired on",
        type: "Working type"
    }

    const classes = useStyles();

    const { id } = useParams();
    const [staffInfo, setStaffInfo] = useState(null);
    const [isLoad, setIsLoad] = useState(true);
    useEffect(() => {
        setIsLoad(true);
        props.getStaffInfo(id);

    }, []);

    useEffect(() => {

        let tmp = {};
        if (props.staffInfo && props.stores) {

            tmp.generalInfo = props.staffInfo.generalInfo;
            tmp.generalInfo.fullname = tmp.generalInfo?.firstName + " " + tmp.generalInfo?.lastName;
            tmp.generalInfo.gender = props.staffInfo.generalInfo.gender == 1 ? "Male" : "Female";

            if (props.staffInfo.jobInformations[0]) {
                tmp.jobInformations = props.staffInfo.jobInformations[0];
                tmp.jobInformations.type = StaffType.find(type => type.value == props.staffInfo.generalInfo.type)?.title;
                // tmp.jobInformation.dateStart = format(new Date(tmp.jobInformations.dateStart), "dd/MM/yyyy");
                console.log(props.stores);
                // console.log(tmp.jobInformations);
                tmp.jobInformations.workAt = props.stores.find(e => e.id == tmp.jobInformations.storeId).name;

            }
            tmp.skills = props.staffInfo.staffSkills;

            setStaffInfo(tmp);
            setIsLoad(false);
        } else {
            setIsLoad(true);
        }
    },
        [props.staffInfo]);



    return (
        <Paper className={classes.container}>
            <CardHeader title={
                <Typography variant="h2">
                    Staff Information
                </Typography>
            } disableTypography={false}
                action={<IconButton component={Link} to={`/staff/edit/${id}`}><EditOutlinedIcon color="primary" /></IconButton>}
            />
            <Divider />

            {
                !isLoad ? (
                    <CardContent className={classes.containerContent}>
                        <Grid container direction="row" spacing={2}>
                            <Grid item xs={6}>
                                <CardCustom header='General'>
                                    <Grid container spacing={2}>
                                        {

                                            Object.keys(titlePersonals).map(e => {
                                                console.log(e);
                                                console.log(e);
                                                return (
                                                    <Grid container item >
                                                        <Grid item xs={2} style={{ fontWeight: 500 }}>{titlePersonals[e]}</Grid >
                                                        <Grid item xs={1}><Typography variant="body2">:</Typography></Grid >
                                                        <Grid item><Typography variant="body2">{staffInfo.generalInfo[e]}</Typography></Grid>
                                                    </Grid>
                                                );
                                            })
                                        }
                                    </Grid>
                                </CardCustom>
                            </Grid>
                            <Grid item xs={6}>
                                <CardCustom header='Job Information'>
                                    <Grid container spacing={2}>
                                        {
                                            Object.keys(titleJobs).map(e => {
                                                return (
                                                    <Grid container item >
                                                        <Grid item xs={2} style={{ fontWeight: 500 }}>{titleJobs[e]}</Grid >
                                                        <Grid item xs={1}><Typography variant="body2">:</Typography></Grid >
                                                        <Grid item><Typography variant="body2">{staffInfo.jobInformations[e]}</Typography></Grid>
                                                    </Grid>
                                                );
                                            })
                                        }
                                    </Grid>

                                </CardCustom>

                            </Grid>
                            <Grid item xs={6}>

                                <CardCustom header='Skills'>
                                    <Grid container spacing={2}>
                                        {
                                            staffInfo.skills.map(skill => {
                                                return (
                                                    <Grid container item >
                                                        <Grid item xs={2} style={{ fontWeight: 500 }}>{props.skills.find(e => e.id == skill.skillId).name}</Grid >

                                                        <Grid item xs={1}><Typography variant="body2">:</Typography></Grid >
                                                        <Grid item>{renderLevelLableChip(skill.level)}</Grid>
                                                    </Grid>
                                                );
                                            })
                                        }

                                        {/* <Grid container item >
                                    <Typography variant="body2">Junior</Typography>
                                    <LinearProgress />
                                    <LinearProgress variant="determinate" style={{ height: 10, }} value={30} color="primary" />
                                </Grid> */}


                                    </Grid>

                                </CardCustom>

                            </Grid>
                        </Grid>

                        <Box style={{ height: 20 }} />
                        <Grid item  >
                            <Button variant="contained" color="primary" component={Link} to="/staffs" onClick={
                                () => { setIsLoad(true); }
                            }>Back</Button>
                        </Grid>
                    </CardContent>
                ) : (<Skeleton variant="rect" width="100%">
                    <div style={{ paddingTop: '57%' }} />
                </Skeleton>)
            }

        </Paper >
    );
}
const mapStateToProps = (state) => {
    return {
        staffInfo: state.staffs.data,
        stores: state.staffs.stores,
        skills: state.staffs.skills
    }
}
export default connect(
    mapStateToProps, {
    getStaffInfo
}
)(Staff);