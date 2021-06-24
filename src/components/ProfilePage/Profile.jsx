import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Container, createStyles, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, InputAdornment, TextField, withStyles, Card, FormControl, FormLabel, Grid } from '@material-ui/core';

const styles = (Theme) => createStyles({
    root: {
        '& .header-table': {
            backgroundColor: 'rgba(255, 7, 0, 0.55)',
        },
    },

    button: {
        minWidth: 46,
        fontSize: '1em',
        padding: 0,
        marginRight: 5,
        '&:hover': {
            boxShadow: 'none',
        },
    },
    deleteButton: {
        color: "#FA0000",
        borderColor: '#fa000080',
    },
    searchButton: {
        borderColor: Theme.palette.primary.main,
        borderWidth: 1,
        color: Theme.palette.primary.main,
        backgroundColor: Theme.palette.common.white,
        fontWeight: 500,
        height: '2.7em',
        // padding: '10px 30px',
        textAlign: 'center',
        '&:hover': {
            color: "#FFFFFF",
            backgroundColor: Theme.palette.primary.main,
            // borderColor: '#FFFFFF',
            boxShadow: 'none',
        },

    },
    searchInput: {
        height: '3em',
        width: '40%',
        '& input': {
            padding: '13px 10px',
        }
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        // width: '100%',
        marginBottom: '0.5em',
        padding: '5px 12px'
    },
    container: {
        padding: 20
    }
})

class Profile extends React.Component {

    handleSearchValueChange = (event) => {
        this.setState({ searchValue: event.target.value });
    }

    handleSearchSubmit = (e) => {
        if (e.which == 13) {
            console.log('enter');
        }
    }
    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.pageSize !== this.state.pageSize || prevState.pageIndex !== this.state.pageIndex) {
            const { searchValue, pageSize, pageIndex } = this.state;
            const response = this.loadData(searchValue, pageSize, pageIndex);
        }
    }

    handlePageSizeChange = (params) => {
        // setPageSize(params.pageSize);
    };

    render() {
        const { classes } = this.props;



        return (
            <React.Fragment>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={4}>
                        <Card className={this.props.classes.container}>
                            <h2>Profile</h2>
                            <form>
                                <Grid container direction="column" spacing={1}>
                                    <Grid item xs={6}>
                                        <FormControl margin="normal" fullWidth>
                                            <FormLabel >Vu Thi Ngoc Mai</FormLabel>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl margin="normal" fullWidth>
                                            <FormLabel >maivu629@gmail.com</FormLabel>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <FormControl margin="normal" fullWidth>
                                            <FormLabel >Xuân lộc - Đồng Nai - Việt Nam</FormLabel>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </form>
                            <Button style={{ backgroundColor: 'whitesmoke' }} type="submit"><a className="nav-link" href="/editprofile">
                                <p>Edit Profile</p>
                            </a> </Button>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card className={this.props.classes.container}>
                            <h2>Brand</h2>
                            <form>
                                <Grid container direction="column" spacing={1}>
                                    <Card>
                                        <Grid item xs={6}>
                                            <FormControl margin="normal" className={classes.input} fullWidth>
                                                <FormLabel >Effoc coffee</FormLabel>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormControl margin="normal" fullWidth>
                                                <FormLabel >thecfhouse@gmail.com</FormLabel>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <FormControl margin="normal" fullWidth>
                                                <FormLabel >0166542335</FormLabel>
                                            </FormControl>
                                        </Grid>
                                    </Card>
                                </Grid>
                            </form>
                            <Button style={{ backgroundColor: 'white' }} type="submit"><a className="nav-link" href="/editprofile">
                                <p>Edit Brand</p>
                            </a></Button>
                        </Card>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}
const mapStateToProps = (state) => {
    return {};
}

export default connect(mapStateToProps, {

})(withStyles(styles, { withTheme: true })(Profile));

