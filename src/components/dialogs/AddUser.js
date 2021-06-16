import { Checkbox, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, FormLabel, FormControl, Button, TextField, createStyles, withStyles, FormControlLabel } from '@material-ui/core';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import React from 'react';


const styles = (Theme) => createStyles({
    wrapper: {
        height: 800,
        display: 'flex',

    },
    form: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        minWidth: 400,
        minHeight: 500,
        justifyContent: "space-around"

    },
    fieldLabel: {
        marginBottom: 5
    }

});

class AddUser extends React.Component {

    renderInput = ({ label, input, meta: { touched, invalid, error }, InputProps }) => {
        return (
            <div>
                <FormControl margin="normal" fullWidth>
                    <FormLabel classes={{ 'root': this.props.classes.fieldLabel }}>{label}</FormLabel>
                    <TextField  {...input} variant="outlined" InputProps={InputProps} error={touched && invalid}
                        helperText={touched && error} />
                </FormControl>
            </div>);
    }

    renderRadio = ({ label, input, meta: { touched, invalid, error }, InputProps }) => {
        return (
            <div>
                <FormControlLabel style={{ marginLeft: 0 }}
                    control={<Checkbox color="primary" />}
                    label={label}
                    labelPlacement="start"
                />
            </div>);
    }

    renderPassword = ({ label, input, meta: { touched, invalid, error }, }) => {
        return (
            <div>
                <FormControl margin="normal" fullWidth>
                    <FormLabel >{label}</FormLabel>
                    <TextField {...input} type="password" variant="outlined"
                        error={touched && invalid}
                        helperText={touched && error} />
                </FormControl>

            </div>);
    }


    render() {

        const dialogTitle = 'Add User';

        return (<Dialog
            open={this.props.open}
            aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
            <DialogContent>
                <div>
                    <form className={this.props.classes.form}>
                        <Field name="email" component={this.renderInput} label="Email" />
                        <Field name="name" component={this.renderInput} label="Full name" />
                        <Field name="isAdmin" component={this.renderRadio} label="Is a admin ?" />
                        <Field name="password" component={this.renderPassword} label="Password" />
                        <Field name="confirm" component={this.renderPassword} label="Confirm" />
                    </form>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.props.handleClose} color="primary">
                    Cancel
</Button>
                <Button onClick={() => { this.props.handleClose(); }} color="primary" autoFocus>
                    Confirm
</Button>
            </DialogActions>
        </Dialog>);
    }
}

const AddUserForm = reduxForm({
    form: "addUserForm",

})(withStyles(styles)(AddUser));

export default connect()(AddUserForm);