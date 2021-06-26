import { Box, Button, Container, FormControl, FormLabel, Grid, makeStyles, Paper, Tab, Tabs, TextField, Typography } from "@material-ui/core"
import { PostAdd } from "@material-ui/icons";
import React from 'react';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    card: {
        padding: "30px 25px",
    },
    input: {
        fontSize: '1em'
    },
    form: {
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        width: 300
    },
    container: {

        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        padding: 20,

    },
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    const classes = useStyles();
    return (
        <div
            role="tabpanel" className={classes.card}
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            style={{ width: '100%' }}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const EditBrand = () => {

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Paper className={classes.container} elevation={0}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                <Tab label="Edit Brand" />
                <Tab label="Setting Brand" />
            </Tabs>
            <TabPanel value={value} index={0}>
                <h2>Edit Brand</h2>
                <form>
                    <Grid container direction="column" spacing={1}>
                        <Grid container item spacing={3} >
                            <Grid item xs={6}>
                                <FormControl margin="normal" className={classes.input} fullWidth>
                                    <FormLabel >Brand name</FormLabel>
                                    <TextField size="small" variant="outlined" defaultValue="Passio" />
                                </FormControl>
                            </Grid>
                            

                        </Grid>

                        <Grid item xs={12}>
                            <FormControl margin="normal" fullWidth>
                                <FormLabel >Brand's Address</FormLabel>
                                <TextField size="small" variant="outlined" defaultValue="Quan 1 - TP HCM" />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} >
                            <FormControl margin="normal" fullWidth>
                                <FormLabel >Email Address</FormLabel>
                                <TextField size="small" variant="outlined" defaultValue="passio@gmail.com" />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary">Save change</Button>
                            <Button variant="outlined" color="primary">Cancel </Button>
                        </Grid>
                    </Grid>

                </form>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <h2>Setting Brand</h2>
                <form>

                    <Grid container direction="column" spacing={1}>
                        <Grid item xs={12}>
                            <FormControl margin="normal" fullWidth>
                                <FormLabel >Current Password</FormLabel>
                                <TextField size="small" variant="outlined" type='password' />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} >
                            <FormControl margin="normal" fullWidth>
                                <FormLabel >New Password</FormLabel>
                                <TextField size="small" variant="outlined" type='password' />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} >
                            <FormControl margin="normal" fullWidth>
                                <FormLabel >Confirm</FormLabel>
                                <TextField size="small" variant="outlined" type='password' />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary">Save change</Button>
                            <Button variant="outlined" color="primary" type="submit">Cancel</Button>
                        </Grid>
                    </Grid>

                </form>
            </TabPanel>
        </Paper>
    );
}

export default EditBrand;