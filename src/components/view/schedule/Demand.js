import { createStyles, Tab, Tabs, div, withStyles, makeStyles, Box, Grid, Divider, CardHeader, CardContent, Card, Typography, styled } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';


const styles = (theme) => createStyles({
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    root: {
        //  flexGrow: 1,
        //  backgroundColor: theme.palette.background.div,
        // display: 'flex',
        height: "100%",
        //  border: "none"
    },
    cardSkillDemand: {
        border: "none",
        backgroundColor: "#E3F2FD",

    }

});

// const CardStyled = styled(Card) {

// }

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            style={{ width: '100%' }}
        >
            {value === index && (
                <React.Fragment>
                    {children}
                </React.Fragment>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

class DemandPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0
        }
        this.days = [
            { title: "Monday", value: 0 },
            { title: "Tuesday", value: 1 },
            { title: "Wednesday", value: 2 },
            { title: "Thursday", value: 3 },
            { title: "Friday", value: 4 },
            { title: "Saturday", value: 5 },
            { title: "Sunday", value: 6 },
        ]
    }


    handleChange = (event, newValue) => {
        console.log(event);
        this.setState({ tabIndex: newValue });
    }

    render() {
        const classes = this.props.classes;
        return (
            <Grid container className={classes.root}>
                <Grid item xs={2}>
                    <Tabs
                        value={this.state.tabIndex}
                        orientation="vertical"
                        onChange={this.handleChange}
                        className={classes.tabs}
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        {this.days.map(day => (<Tab classes={{ root: classes.tabs_root }} disableRipple label={day.title} key={day.title} value={day.value} />))}
                    </Tabs>
                </Grid>
                <Grid item xs={10}>
                    <TabPanel value={this.state.tabIndex} index={0}>
                        <Grid container spacing={2} style={{ padding: 20 }}>
                            <Grid item xs={3}>
                                <Typography align="center" variant="h4">Bartender</Typography>
                                <Card className={classes.cardSkillDemand} elevation={0}>
                                    <CardHeader disableTypography={false}
                                        title={<Typography variant="h5" style={{ color: "#2196F3" }}>Bartender</Typography>} />
                                    <CardContent>
                                        <Typography variant="h6" style={{ color: "#2196F3" }}>7:00 - 12:00</Typography>
                                        <Typography variant="h6" style={{ color: "#2196F3" }}>2 Beginer</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography align="center" variant="h4">Bartender</Typography>
                                <Card>
                                    <CardHeader title="Bartender" />
                                    <CardContent>
                                        <Typography variant="h5">7:00 - 12:00</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography align="center" variant="h4">Bartender</Typography>
                                <Card>
                                    <CardHeader title="Bartender" />
                                    <CardContent>
                                        <Typography variant="h5">7:00 - 12:00</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography align="center" variant="h4">Bartender</Typography>
                                <Card>
                                    <CardHeader title="Bartender" classes={{
                                        title: {

                                        }
                                    }} />
                                    <CardContent>
                                        <Typography variant="h5">7:00 - 12:00</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                    </TabPanel>
                    <TabPanel value={this.state.tabIndex} index={1}>
                        Item Two
                    </TabPanel>
                    <TabPanel value={this.state.tabIndex} index={2}>
                        Item Three
                    </TabPanel>
                    <TabPanel value={this.state.tabIndex} index={3}>
                        Item Four
                    </TabPanel>
                    <TabPanel value={this.state.tabIndex} index={4}>
                        Item Five
                    </TabPanel>
                    <TabPanel value={this.state.tabIndex} index={5}>
                        Item Six
                    </TabPanel>
                    <TabPanel value={this.state.tabIndex} index={6}>
                        Item Seven
                    </TabPanel>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles, { withTheme: true })(DemandPage);



