import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormLabel, TextField, Typography } from "@material-ui/core";

function AddWeekSchedulePlanDialog(props) {

    const { handleClose, open } = props;


    return (
        <Dialog
            onClose={handleClose}
            fullWidth={true}
            maxWidth="xs"
            open={open}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                <Typography variant="h3">Add Plan</Typography>
            </DialogTitle>
            <form onSubmit={(e) => {
                e.preventDefault();
            }}>
                <DialogContent dividers>

                    <FormControl fullWidth>
                        <FormLabel>Schedule plan name:</FormLabel>
                        <TextField required variant="outlined" size="small" />
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
export default AddWeekSchedulePlanDialog;