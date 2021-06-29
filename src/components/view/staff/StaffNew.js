// <<<<<<< cuong
import { Accordion, AccordionDetails, AccordionSummary, Button, Card, CardContent, CardHeader, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormLabel, Grid, makeStyles, MenuItem, OutlinedInput, Paper, Select, TextField, Typography, useTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
// =======
// import { Accordion, AccordionDetails, AccordionSummary, Button,  CardContent, CardHeader, Checkbox,  Divider, FormControl, FormControlLabel, FormLabel, Grid, makeStyles, MenuItem,  Paper, Select, TextField, Typography, useTheme } from '@material-ui/core';
// import React from 'react';
// >>>>>>> main
import { CardCustom } from '../../CardCustom';
// import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import StaffForm from './StaffForm';
import { connect } from 'react-redux';
import { loadStaffNew } from '../../../_actions'
import { Skeleton } from '@material-ui/lab';

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

// <<<<<<< cuong


function StaffNew(props) {
// =======
// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//     PaperProps: {
//         style: {
//             maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//             width: 250,
//         },
//     },
// };

// const skills = [
//     'Barista',
//     'Waiter',
//     'Cashier',
// ];

// function getStyles(name, personName, theme) {
//     return {
//         fontWeight:
//             personName.indexOf(name) === -1
//                 ? theme.typography.fontWeightRegular
//                 : theme.typography.fontWeightMedium,
//     };
// }
// export default function StaffNew() {

//     const renderInput = (title) => {
//         return (<FormControl margin="normal" className={classes.input} fullWidth>
//             <FormLabel >{title}</FormLabel>
//             <TextField size="small" variant="outlined" />
//         </FormControl>);
//     }
// >>>>>>> main

    const classes = useStyles();
    const dataNew = {

    };
    const onSubmit = (formValues) => {
        
    }
    // const [initData, setInitData] = useState({});
    useEffect(
        () => {
            const init_data = {};
            props.skills.forEach(skill => (
                init_data[`skill${skill.id}Level`] = 0
            ));

            props.loadStaffNew(init_data);
        }, []
    );

    console.log({ ...props.initialValues });
    return (

        <Paper className={classes.container}>
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

            </div> : <StaffForm onSubmit={onSubmit} skills={props.skills}
                skillLevels={props.skillLevels}
                initialValues={{ ...props.initialValues, }} />}


        </Paper >
    );
}

const skills = [
    { id: 0, name: "Bartender" },
    { id: 1, name: "Cashier" },
    { id: 2, name: "Bartender" }
];

const skillLevels = [
    { value: 0, title: "Beginner" },
    { value: 1, title: "Immegiate" },
    { value: 2, title: "Experience" },
];

const mapStateToProps = (state) => {

    return {
        initialValues: state.staffs.data,
        skills: skills,
        skillLevels: skillLevels
    };
}


export default connect(mapStateToProps, {
    loadStaffNew
})(StaffNew);