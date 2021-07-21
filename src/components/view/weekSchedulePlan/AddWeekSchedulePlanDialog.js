import { FormControl, FormLabel, TextField } from "@material-ui/core";

function AddWeekSchedulePlanDialog(props) {

    const { handleClose, open } = props;


    return (
        <Dialog
            onClose={handleClose}
            fullWidth={true}
            maxWidth="xs"
            open={this.state.openAttendanceDialog}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                <Typography variant="h3">Add Plan</Typography>
            </DialogTitle>
            <DialogContent dividers>
                <FormControl>
                    <FormLabel>Schedule plan name:</FormLabel>
                    <TextField variant="outlined" />
                </FormControl>
                <FormControl>
                    <FormLabel>Clone from</FormLabel>
                    <TextField variant="outlined" />
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose} color="primary">
                    Save
                </Button>
                <Button autoFocus onClick={handleClose} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>);
}