import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormLabel, TextField, Typography } from "@material-ui/core";
import { useState } from "react";

function EditWeekScheduleNameDialog(props) {

    const { handleClose, open, nameValue, onSubmit } = props;
    const [name, setName] = useState(nameValue ? nameValue : "");


    return (
        <Dialog
            onClose={handleClose}
            fullWidth={true}
            maxWidth="xs"
            open={open}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                <Typography variant="h3">Edit</Typography>
            </DialogTitle>
            <form onSubmit={(e) => {
                e.preventDefault();
                onSubmit(name);
            }}>
                <DialogContent dividers>

                    <FormControl fullWidth>
                        <FormLabel>Schedule plan name:</FormLabel>
                        <TextField required variant="outlined" size="small" value={name} onChange={(e) => {
                            setName(e.target.value);
                        }} />
                    </FormControl>

                    {/* <FormControl>
                    <FormLabel>Clone from</FormLabel>
                    <TextField variant="outlined" />
                </FormControl> */}
                </DialogContent>
                <DialogActions>
                    <Button autoFocus type="submit" color="primary">
                        Save
                    </Button>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </form>
        </Dialog>);
}
export default EditWeekScheduleNameDialog;