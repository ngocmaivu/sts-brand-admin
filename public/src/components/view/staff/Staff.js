import { Box, Button, Card, CardContent, CardHeader, Chip, Divider, FormControl, FormLabel, Grid, Input, InputBase, makeStyles, MenuItem, OutlinedInput, Paper, Select, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography, useTheme } from '@material-ui/core';
import React from 'react';
import { CardCustom } from '../../CardCustom';
import _ from 'lodash';
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

const skills = [
    'Barista',
    'Waiter',
    'Cashier',
];

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}
export default function Staff() {

    const renderInput = (title) => {
        return (<FormControl margin="normal" className={classes.input} fullWidth>
            <FormLabel >{title}</FormLabel>
            <TextField size="small" variant="outlined" />
        </FormControl>);
    }

    const [skillSelect, setSkillSelect] = React.useState([]);
    const handleSkillSelectChange = (event) => {
        setSkillSelect(event.target.value);
    };

    const handleSkillSelectChangeMultiple = (event) => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setSkillSelect(value);
    };

    // renderInput = ({ label, input, meta: { touched, invalid, error }, InputProps }) => {
    //     return (
    //         <div>
    //             <FormControl margin="normal" fullWidth>
    //                 <FormLabel>{label}</FormLabel>
    //                 <TextField  {...input} variant="outlined" InputProps={InputProps} error={touched && invalid}
    //                     helperText={touched && error} />
    //             </FormControl>
    //         </div>);
    // }

    const personalInfo = {
        fullname: "Anshan Handgun",
        address: "Street 110-B Kalians Bag, Dewan, M.P. INDIA",
        email: "support@example.com",
        phone: "+0 123456789",
        bOd: "",
        gender: "Male",

        workAt: [

        ],
        hiredOn: "",
        skills: [],
        type: "fulltime"

    }



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
        hiredOn: "Hired on",
        skills: "Skill",
        type: "Working type"
    }
    const classes = useStyles();
    const theme = useTheme();
    return (
        <Paper className={classes.container}>
            <CardHeader title={
                <Typography variant="h2">
                    Staff Info
                </Typography>
            } disableTypography={false}
            />
            <Divider />
            <CardContent className={classes.containerContent}>
                <CardCustom header='General'>
                    <Grid container spacing={2}>
                        {
                            
                            Object.keys(titlePersonals).map(e => {
                                return (
                                    <Grid container item >
                                        <Grid item xs={2} style={{ fontWeight: 500 }}>{titlePersonals[e]}</Grid >
                                        <Grid item xs={1}><Typography variant="body2">:</Typography></Grid >
                                        <Grid item><Typography variant="body2">{personalInfo[e]}</Typography></Grid>
                                    </Grid>
                                );
                            })
                        }
                    </Grid>

                </CardCustom>
                <Box style={{height:20}}/>
                <CardCustom header='Job Information'>
                    <Grid container spacing={2}>
                        {
                            Object.keys(titleJobs).map(e => {
                                return (
                                    <Grid container item >
                                        <Grid item xs={2} style={{ fontWeight: 500 }}>{titleJobs[e]}</Grid >
                                        <Grid item xs={1}><Typography variant="body2">:</Typography></Grid >
                                        <Grid item><Typography variant="body2">{personalInfo[e]}</Typography></Grid>
                                    </Grid>
                                );
                            })
                        }
                    </Grid>

                </CardCustom>
            </CardContent>
        </Paper >
    );
}