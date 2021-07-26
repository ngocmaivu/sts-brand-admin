import React from 'react';
import firebase from "../../../firebase";
import { getConstraintDefault } from '../../../ultis/scheduleDefault';
import { Card, CardHeader, Grid, Paper, Button, withStyles, Modal, createStyles, Divider, CardContent, LinearProgress, Typography, Checkbox, Tabs, Tab } from '@material-ui/core';
import SettingConstraintsForm from '../schedule/SettingConstraintsForm';
import { pickBy } from 'lodash';
import OperatingHoursConfig from './OperatingHour';
import PropTypes from 'prop-types';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            style={{ width: '100%', height: "85%" }}
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

class ScheduleConfig extends React.Component {
    constructor(props) {
        super(props);


        const user = JSON.parse(localStorage.getItem("jwt_decode"));
        this.BrandId = user.brandId;
        this.StoreId = user.storeId;
        const ref = firebase.firestore().collection("brands");
        this.state = {
            constraints: null,
            tabIndex: 0
        }
        //Check Brand-Store on firebase
        ref.doc(`${this.BrandId}-${this.StoreId}`).get().then((doc) => {
            if (!doc.exists) {
                //Set doc
                const data = {
                    BrandId: this.BrandId,
                    StoreId: this.StoreId,
                    DefaultScheduleConfig: {
                        constraints: getConstraintDefault()
                    }
                };

                ref.doc(`${this.BrandId}-${this.StoreId}`)
                    .set(data)
                    .then(() => {
                        console.log("Document successfully written!");
                        this.setState({ constraints: getConstraintDefault() });
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                    });
            } else {
                if (!doc.data().DefaultScheduleConfig) {
                    ref.doc(`${this.BrandId}-${this.StoreId}`).update({
                        DefaultScheduleConfig: {
                            constraints: getConstraintDefault()
                        }
                    });
                    this.setState({ constraints: getConstraintDefault() });
                } else {
                    console.log(doc.data().DefaultScheduleConfig.constraints)
                    this.setState({ constraints: doc.data().DefaultScheduleConfig.constraints });
                }


            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    fetchData() {
        console.log(this.state.constraints);
    }

    componentDidMount() {
    }
    componentDidUpdate(preState) {
        console.log(this.state.constraints);
    }

    renderConstraintData = (storeScheduleDetails) => {
        if (storeScheduleDetails) {
            var constraintData = {};
            storeScheduleDetails.forEach(constraint => {
                var prefix = constraint.staffType == 0 ? "ft" : "pt"

                Object.keys(constraint).forEach(key => {
                    constraintData = {
                        ...constraintData, [`${prefix}${key}`]: constraint[key] ? constraint[key] : 0
                    }
                })

            });
            return constraintData;

        }
    }

    onSubmitConstraints = (constraintValues) => {
        // const cleanedObject = pickBy(originalObject, v => v !== undefined)
        // constraintValues.forEach(c => {
        //     c = pickBy(c, v => v !== undefined);
        //     console.
        // });
        constraintValues[0] = pickBy(constraintValues[0], v => v !== undefined);
        constraintValues[1] = pickBy(constraintValues[1], v => v !== undefined);
        console.log(constraintValues);
        const ref = firebase.firestore().collection("brands");
        ref.doc(`${this.BrandId}-${this.StoreId}`).update({
            DefaultScheduleConfig: {
                constraints: constraintValues
            }
        });
    }

    handleChange = (event, newValue) => {
        this.setState({ tabIndex: newValue });
    }


    render() {
        return (<Paper>
            <Tabs
                value={this.state.tabIndex}
                indicatorColor="primary"
                textColor="primary"
                onChange={this.handleChange}
                aria-label="disabled tabs example"
            >
                <Tab label="Constraints " value={0} />
                <Tab label="Operating Hours" value={1} />
            </Tabs>

            <TabPanel value={this.state.tabIndex} index={1}>
                <OperatingHoursConfig />
            </TabPanel>
            <TabPanel value={this.state.tabIndex} index={0}>
                {
                    this.state.constraints ? (
                        <SettingConstraintsForm
                            initialValues={this.renderConstraintData(this.state.constraints)}
                            onSubmit={this.onSubmitConstraints} />
                    ) : "...Loading"
                }
            </TabPanel>

        </Paper>);
    }
}

export default ScheduleConfig;