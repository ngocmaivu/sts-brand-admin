import { createStyles, FormControl, FormLabel, Grid, MenuItem, withStyles, Select, Button, InputLabel } from '@material-ui/core';
import React from 'react';
import firebase from "../../../firebase";
import { getConstraintDefault, getOperatingTimesDefault } from '../../../ultis/scheduleDefault';
import DemandTemplateEditor from './DemandTemplateEditor';
import { fetchSkillSrc, fetchDefaultConfig } from "../../../_actions/";
import { connect } from 'react-redux';
import DemandTemplateContent from './DemandTemplateContent';
import ConfirmDialog from './ConfirmDialog';
const styles = (Theme) => createStyles({
    inputAutoComplete: {
        "& .MuiInputBase-root": {
            padding: "0 0 0 10px"
        }
    },
    container: {
        padding: 12,
    },
    deleteBtn: {
        color: Theme.palette.error.main,
        borderColor: Theme.palette.error.main,
    }
});

class DemandTemplates extends React.Component {

    constructor(props) {
        super(props);

        const user = JSON.parse(localStorage.getItem("jwt_decode"));
        this.BrandId = user.brandId;
        this.StoreId = user.storeId;

        this.state = {
            demandTemplates: [],
            demandTemplateSelected: null,
            openAddDialog: false,
            openDeleteDialog: false,
        };


        const ref = firebase.firestore().collection("brands");

        this.props.fetchDefaultConfig();

        //INIT
        ref.doc(`${this.BrandId}-${this.StoreId}`).get().then((doc) => {
            if (!doc.exists) {
                //Set doc
                const data = {
                    BrandId: this.BrandId,
                    StoreId: this.StoreId,
                    DefaultScheduleConfig: {
                        constraints: getConstraintDefault(),
                        operatingTimes: getOperatingTimesDefault(),
                    }
                };

                ref.doc(`${this.BrandId}-${this.StoreId}`)
                    .set(data)
                    .then(() => {
                        console.log("Document successfully written!");
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                    });


                ref.doc(`${this.BrandId}-${this.StoreId}`).collection("demandTemplates");
            } else {

            }
        });
    }

    getDemandTemplates = () => {
        const ref = firebase.firestore().collection("brands");
        ref.doc(`${this.BrandId}-${this.StoreId}`).collection("demandTemplates").onSnapshot((snapshot) => {
            console.log(snapshot.empty);
            if (snapshot.empty) {

            } else {
                let tmp = [];
                snapshot.forEach((doc) => {
                    let demandTemplate = doc.data();
                    console.log(demandTemplate);
                    tmp.push(demandTemplate);
                });
                if (!this.state.demandTemplateSelected) {
                    this.setState({ demandTemplates: tmp, demandTemplateSelected: tmp[0].id });
                } else {
                    this.setState({ demandTemplates: tmp });
                }
            }
        });
    }



    componentDidMount() {
        //get
        this.getDemandTemplates();
        this.props.fetchSkillSrc();
    }

    addDemandTemplate(name) {
        const ref = firebase.firestore().collection("brands");
        ref.doc(`${this.BrandId}-${this.StoreId}`).collection("demandTemplates").add({
            name: name
        }).then((docRef) => {
            console.log("Document successfully written!");
            docRef.update({ id: docRef.id });
        }).catch((error) => {
            console.error("Error writing document: ", error);
        });
    }

    renderAddDemandTemplateDialog = () => {
        const handleClose = () => {
            this.setState({ openAddDialog: false });
        }

        return (
            <DemandTemplateEditor open={this.state.openAddDialog}
                handleClose={handleClose}
                nameValue={""}
                onSubmit={async (name) => {
                    console.log(name);
                    this.addDemandTemplate(name);
                    handleClose();
                }}
            />);
    }
    renderDeleteDialog = () => {
        const handleClose = () => {
            this.setState({ openDeleteDialog: false });
        }
        return (
            <ConfirmDialog
                title="Delete Dialog"
                message={`Do you want to delete this demand template?`}
                handleClose={handleClose}
                open={this.state.openDeleteDialog}
                handleConfirm={() => {
                    this.handleDeleteTemplate();
                    handleClose();

                }}
            />
        )

    }

    handleDeleteTemplate = () => {
        const ref = firebase.firestore().collection("brands");
        this.setState({ demandTemplateSelected: null });
        ref.doc(`${this.BrandId}-${this.StoreId}`).collection("demandTemplates").doc(this.state.demandTemplateSelected).delete();

    }


    render() {
        return (
            <React.Fragment>
                <Grid container direction="column" className={this.props.classes.container}>
                    <Grid item container>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <FormLabel>Templates:</FormLabel>
                                {/* <InputLabel>Select</InputLabel> */}
                                <Select variant="outlined" fullWidth
                                    value={this.state.demandTemplateSelected ? this.state.demandTemplateSelected : ""}
                                    onChange={(e) => {
                                        this.setState({ demandTemplateSelected: e.target.value });
                                    }}
                                >
                                    {
                                        this.state.demandTemplates.map((template, index) => (
                                            <MenuItem key={index} value={template.id}>{template.name}</MenuItem>
                                        ))
                                    }

                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="outlined" color="primary"
                                onClick={() => { this.setState({ openAddDialog: true }) }}>Add</Button>
                            <Button
                                variant="outlined"
                                disabled={this.state.demandTemplateSelected == null}
                                className={this.props.classes.deleteBtn}
                                onClick={() => { this.setState({ openDeleteDialog: true }) }}>Delete</Button>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <DemandTemplateContent demandTemplateId={this.state.demandTemplateSelected} />
                    </Grid>
                </Grid>
                {this.renderAddDemandTemplateDialog()}
                {this.renderDeleteDialog()}
            </React.Fragment>
        );
    }
}

export default
    connect(
        null, {
        fetchSkillSrc,
        fetchDefaultConfig
    }
    )(
        withStyles(styles, { withTheme: true })(DemandTemplates));