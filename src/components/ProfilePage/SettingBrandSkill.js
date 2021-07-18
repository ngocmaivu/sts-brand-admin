import { Box, Button, Container, FormControl, FormLabel, makeStyles, Grid, Paper, Tab, Tabs, TextField, Typography, withStyles, Card } from "@material-ui/core"
import { Delete, Edit, PostAdd } from "@material-ui/icons";
import React from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from "@material-ui/data-grid";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { skillActions } from "../../_actions";

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

const dataTable = [
    { id: "1", name: "", description: "" },
    { id: "2", name: "", description: "" },
]
class SettingBrandSkill extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            skill: {
                name: '',
                description: '',
            },
            submitted: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    };
    handleChange(event) {
        const { name, value } = event.target;
        const { skill } = this.state;
        this.setState({
            skill: {
                ...skill,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { skill } = this.state;
        if (skill.name) {
            this.props.create(skill);
        }
    }
    handleClick(event) {
        // event.preventDefault();

        this.setState({ submitted: true });
        const { skill } = this.state;
        // if (store.name) {
        this.props.create(skill);
        // }
        console.log('this is:', this);
    }
    handleDeleteSkill(id) {
        return (e) => { this.props.delete(id);}
    }
    componentDidMount() {
        // this.props.getAllByPage(this.state.pageIndex,this.state.pageSize);
        this.props.getAllSkill();
    }

    render() {
        const { skill, type } = this.props;
        console.log(skill)
        const columns = [
            { field: 'id', headerName: 'Skill ID', width: 150 },
            { field: 'name', headerName: 'Name', width: 250 },
            { field: 'description', headerName: 'Description', width: 500 },
            {
                field: 'action', headerName: "Actions", flex: 0.3, sortable: false, filterable: false,
                headerAlign: 'center',
                width: 50,
                renderCell: (params) => {

                    return (<span>
                        <Button color='primary' > Edit</Button>
                        <Button  onClick={this.handleDeleteSkill(params.id)} style={{ color: 'red' }}>Delete</Button>
                        
                    </span>);
                }
            }
        ];
        if (!this.props.skill.items) {
            return <p>...Loading</p>;
        }
        return (
            <React.Fragment>
                <Card style={{ padding: '10px', marginBottom: '20px' }}>
                    <h1>Setting Brand Skill</h1>
                </Card>
                <Paper style={{padding: "20px"}}>
                    <form>
                        <Grid container direction="column" spacing={1}>
                            <Grid container item spacing={3} >
                                <Grid item xs={6}>
                                    <FormControl margin="normal" className={this.props.classes.input} fullWidth >
                                        <FormLabel >Skill:</FormLabel>
                                        <TextField name="name" size="small" variant="outlined" onChange={this.handleChange} />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl margin="normal" className={this.props.classes.input} fullWidth>
                                        <FormLabel >Description:</FormLabel>
                                        <TextField name="description" size="small" variant="outlined" onChange={this.handleChange} />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid item xs={2}>
                                <FormControl margin="normal">
                                    <Button onClick={() => this.handleClick()} style={{ backgroundColor: '#66CCFF' }} variant="contained" >Add</Button>
                                </FormControl>

                            </Grid>
                            <div style={{ height: 452, width: '100%' }}>
                                <DataGrid disableColumnFilter rows={skill.items} columns={columns} rowsPerPageOptions={[10, 20, 50]} rowCount={100} pagination
                                    paginationMode="server" />
                            </div>
                        </Grid>
                    </form>
                </Paper>
            </React.Fragment>
        );
    }
}

function mapState(state) {
    const { skill, deleting } = state;
    return { skill, deleting };
}
export default connect(mapState, {
    getAllSkill: skillActions.getAllSkill,
    create: skillActions.create,
    updateSkill: skillActions.updateSkill,
    delete: skillActions.delete
})(withStyles({ withTheme: true })(SettingBrandSkill));