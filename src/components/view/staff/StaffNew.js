import { Accordion, AccordionDetails, AccordionSummary, Button,  CardContent, CardHeader, Checkbox,  Divider, FormControl, FormControlLabel, FormLabel, Grid, makeStyles, MenuItem,  Paper, Select, TextField, Typography, useTheme } from '@material-ui/core';
import React from 'react';
import { CardCustom } from '../../CardCustom';
// import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
export default function StaffNew() {

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


    const classes = useStyles();
    const theme = useTheme();
    return (
        <Paper className={classes.container}>
            <CardHeader title={
                <Typography variant="h2">
                    Add New Staff
                </Typography>
            } disableTypography={true}
            />

            <Divider />
            <CardContent className={classes.containerContent}>
                <form>
                    <Grid container  spacing={5} >
                        <Grid item xs={12}>
                            <CardCustom header='General'>
                                <Grid container direction="column" spacing={1} >
                                    <Grid container item spacing={3} >
                                        <Grid item xs={6}>
                                            {renderInput("First name")}
                                        </Grid>
                                        <Grid item xs={6}>
                                            {renderInput("Last name")}
                                        </Grid>

                                    </Grid>

                                    <Grid item xs={12}>
                                        {renderInput("Address")}
                                    </Grid>
                                    <Grid container item spacing={3} >
                                        <Grid item xs={6}>
                                            <FormControl margin="normal" className={classes.input} fullWidth>
                                                <FormLabel >Birthday</FormLabel>
                                                <TextField
                                                    id="date"
                                                    type="date"
                                                    defaultValue="2017-05-24"
                                                    size="small" variant="outlined"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormControl margin="normal" className={classes.input} fullWidth>
                                                <FormLabel >Gender</FormLabel>
                                                <Select
                                                    value={1}
                                                    variant="outlined"
                                                >
                                                    <MenuItem value={1}>Male</MenuItem>
                                                    <MenuItem value={0}>Female</MenuItem>

                                                </Select>
                                            </FormControl>
                                        </Grid>
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
                        <Grid item xs={6}>
                            <CardCustom header='Job Information'>
                                <Grid container direction="column" spacing={1} >
                                    <Grid container item spacing={3} >
                                        <Grid item xs={6}>
                                            <FormControl margin="normal" className={classes.input} fullWidth>
                                                <FormLabel >Wort at</FormLabel>
                                                <Select
                                                    value={1}
                                                    variant="outlined"
                                                >
                                                    <MenuItem value={1}>Store 1</MenuItem>
                                                    <MenuItem value={0}>Store 2</MenuItem>

                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>


                                    <Grid container item spacing={3} >
                                        <Grid item xs={6}>
                                            <FormControl margin="normal" className={classes.input} fullWidth>
                                                <FormLabel >Hired On</FormLabel>
                                                <TextField
                                                    id="date"
                                                    type="date"
                                                    size="small" variant="outlined"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormControl margin="normal" className={classes.input} fullWidth>
                                                <FormLabel >Type</FormLabel>
                                                <Select
                                                    value={1}
                                                    variant="outlined"
                                                >
                                                    <MenuItem value={1}>Fulltime</MenuItem>
                                                    <MenuItem value={0}>Parttime</MenuItem>

                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardCustom>
                        </Grid>
                        <Grid item xs={6}>
                            <CardCustom header='Skills'>
                                <Grid container direction="column" spacing={1} >
                                    <Grid item>

                                        <Accordion>
                                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                <FormControlLabel
                                                    onClick={(event) => event.stopPropagation()}
                                                    onFocus={(event) => event.stopPropagation()}
                                                    control={<Checkbox />}
                                                    label="Bartender"
                                                />
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <FormControl margin="normal" className={classes.input} fullWidth>
                                                    <FormLabel >Skill level</FormLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={0}

                                                    >
                                                        <MenuItem value={0}>Beginner</MenuItem>
                                                        <MenuItem value={1}>Immegiate</MenuItem>
                                                        <MenuItem value={2}>Experience</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </AccordionDetails>

                                        </Accordion>
                                    </Grid>
                                    <Grid item>
                                        <Accordion>
                                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                            <FormControlLabel
                                                    onClick={(event) => event.stopPropagation()}
                                                    onFocus={(event) => event.stopPropagation()}
                                                    control={<Checkbox />}
                                                    label="Waiter"
                                                />
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <FormControl margin="normal" className={classes.input} fullWidth>
                                                    <FormLabel >Skill level</FormLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={0}

                                                    >
                                                        <MenuItem value={0}>Beginner</MenuItem>
                                                        <MenuItem value={1}>Immegiate</MenuItem>
                                                        <MenuItem value={2}>Experience</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </AccordionDetails>

                                        </Accordion>
                                    </Grid>
                                    <Grid item>
                                        <Accordion>
                                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                            <FormControlLabel
                                                    onClick={(event) => event.stopPropagation()}
                                                    onFocus={(event) => event.stopPropagation()}
                                                    control={<Checkbox />}
                                                    label="Cashier"
                                                />
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <FormControl margin="normal" className={classes.input} fullWidth>
                                                    <FormLabel >Skill level</FormLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={0}

                                                    >
                                                        <MenuItem value={0}>Beginner</MenuItem>
                                                        <MenuItem value={1}>Immegiate</MenuItem>
                                                        <MenuItem value={2}>Experience</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </AccordionDetails>

                                        </Accordion>
                                    </Grid>
                                </Grid>
                            </CardCustom>
                        </Grid>
                        <Grid item container xs={12} justify="flex-end" spacing={1} direction="row">
                            <Grid item >
                                <Button variant="contained" color="primary">Save change</Button>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" color="primary">Cancel </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Paper >
    );
}