import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText,  Typography } from "@material-ui/core";
import { useEffect, useState } from "react";

function ConfirmDialog(props) {

    const { handleClose, open, handleConfirm, title, message } = props;

    return (
        <Dialog
            onClose={handleClose}
            fullWidth={true}
            maxWidth="xs"
            open={open}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose} disableTypography>
                <Typography variant="h3">{title}</Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus type="submit" color="primary" onClick={handleConfirm}>
                    Confirm
                </Button>
                <Button autoFocus onClick={handleClose} color="primary">
                    Cancel
                </Button>
            </DialogActions>

        </Dialog>);
}
export default ConfirmDialog;