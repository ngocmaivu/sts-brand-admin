import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { Typography } from '@material-ui/core';

export default function AlertDialog(props) {

    const { open, handleClose } = props;

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" ><Typography variant="h4"><ErrorOutlineIcon style={{ color: "#ffc400" }} />{"Can't compute schedule"}</Typography></DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Can't compute schedule.
                        Something wrong with your schedule data!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {/* <Button onClick={handleClose} color="primary">
                        Disagree
                    </Button> */}
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
