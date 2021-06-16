import { Button, Card, CardContent, CardHeader, Chip, Divider, FormControl, FormLabel, Grid, makeStyles, MenuItem, OutlinedInput, Paper, Select, TextField, Typography, useTheme } from '@material-ui/core';
import React from 'react';
import { CardCustom } from '../CardCustom';
import { Link } from 'react-router-dom';
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
export default function StoreNew() {

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

    const classes = useStyles();
    const theme = useTheme();
    return (
        <Paper className={classes.container}>
            <CardHeader title={
                <Typography variant="h2">
                    Add New Store
                </Typography>
            } disableTypography="true"
            />

            <Divider />
            <CardContent className={classes.containerContent}>
                <form>
                    <Grid container direction="column" spacing={5} >
                        <Grid item xs={12}>
                            <CardCustom header='General'>
                                <Grid container direction="column" spacing={1} >
                                    <Grid container item spacing={3} >
                                        <Grid item xs={6}>
                                            {renderInput("Store name")}
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12}>
                                        {renderInput("Address")}
                                    </Grid>
                                    <Grid container item spacing={3} >
                                        <Grid item xs={6} >
                                            {renderInput("Email")}
                                        </Grid>
                                        <Grid item xs={6} >
                                            {renderInput("Phone")}
                                        </Grid>
                                    </Grid>


                                </Grid>
                            </CardCustom>
                        </Grid> 
                        <Grid item container xs={12} justify="flex-end" spacing={1} direction="row">
                            <Grid item xs={1.5} >
                                <Button variant="contained" color="primary">Save change</Button>
                            </Grid>
                            <Grid item xs={1.5}>
                                <Button variant="outlined" color="primary">Cancel </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Paper>
    );
}