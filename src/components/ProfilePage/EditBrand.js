import { Box, Button, Container, FormControl, FormLabel, makeStyles, Grid, Paper, Tab, Tabs, TextField, Typography } from "@material-ui/core"
import { Delete, Edit, PostAdd } from "@material-ui/icons";
import React from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from "@material-ui/data-grid";
import { Link } from 'react-router-dom';

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

const dataTable = [
    { id: "1", name: "", description: "" },
    { id: "2", name: "", description: "" },
]
const EditBrand = () => {

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const columns = [
        { field: 'id', headerName: 'Store ID', width: 200 },
        { field: 'name', headerName: 'Name', width: 300 },
        { field: 'description', headerName: 'Description', width: 300 },
        {
            field: 'action', headerName: "Actions", flex: 0.3, sortable: false, filterable: false,
            headerAlign: 'center',
            width: 50,
            renderCell: (params) => {

                return (<span>
                    <Button color='primary' > Edit</Button>
                    <Button style={{ color: 'red' }}>Delete</Button>
                </span>);
            }
        }
    ];
   
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
                <Tab label="Setting Brand Skill" />
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
                <h2>Setting Brand Skill</h2>
                <form>

                    <Grid container direction="column" spacing={1}>
                        <Grid container item spacing={3} >
                            <Grid item xs={6}>
                                <FormControl margin="normal" className={classes.input} fullWidth>
                                    <FormLabel >Skill:</FormLabel>
                                    <TextField size="small" variant="outlined" />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl margin="normal" className={classes.input} fullWidth>
                                    <FormLabel >Description:</FormLabel>
                                    <TextField size="small" variant="outlined" />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid item xs={2}>
                            <FormControl margin="normal">
                                <Button style={{ backgroundColor: '#66CCFF' }} variant="contained" >Add</Button>
                            </FormControl>

                        </Grid>
                        <div style={{ height: 452, width: '100%' }}>
                            <DataGrid disableColumnFilter rows={dataTable} columns={columns} rowsPerPageOptions={[10, 20, 50]} rowCount={100} />
                            
                        </div>
                    </Grid>

                </form>
            </TabPanel>
        </Paper>
    );
}

export default EditBrand;