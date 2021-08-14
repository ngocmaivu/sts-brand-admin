import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormLabel, TextField, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";

function DemandTemplateEditor(props) {

    const { handleClose, open, nameValue, onSubmit } = props;
    const [name, setName] = useState(nameValue ? nameValue : "");

    useEffect(
        () => {
            setName(props.nameValue);
        },
        [props.nameValue]
    )

    return (
        <Dialog
            onClose={handleClose}
            fullWidth={true}
            maxWidth="xs"
            open={open}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                <Typography variant="h3">New Template</Typography>
            </DialogTitle>
            <form onSubmit={(e) => {
                e.preventDefault();
                onSubmit(name);
            }}>
                <DialogContent dividers>

                    <FormControl fullWidth>
                        <FormLabel>Template name:</FormLabel>
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
export default DemandTemplateEditor;