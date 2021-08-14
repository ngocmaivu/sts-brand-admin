import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormLabel, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";

function GetDemandTemplateDialog(props) {

    const { handleClose, open, handleSubmit, demandTemplates } = props;
    const [demandTemplateSelected, setDemandTemplateSelected] = useState("");

    useEffect(
        () => {
        },
        [props.demandTemplates]
    )

    useEffect(
        () => {
            if (demandTemplates) {
                setDemandTemplateSelected(demandTemplates[0].id);
            }
        },
        []
    )

    return (
        <Dialog
            onClose={handleClose}
            fullWidth={true}
            maxWidth="xs"
            open={open}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose} disableTypography>
                <Typography variant="h3">Get Template</Typography>
            </DialogTitle>

            <DialogContent dividers>

                <FormControl fullWidth>
                    <FormLabel>Templates:</FormLabel>
                    {/* <InputLabel>Select</InputLabel> */}
                    <Select variant="outlined" fullWidth
                        value={demandTemplateSelected}
                        onChange={(e) => {
                            setDemandTemplateSelected(e.target.value);
                        }}
                    >
                        {
                            demandTemplates.map((template, index) => (
                                <MenuItem key={index} value={template.id}>{template.name}</MenuItem>
                            ))
                        }

                    </Select>
                </FormControl>

                {/* <FormControl>
                    <FormLabel>Clone from</FormLabel>
                    <TextField variant="outlined" />
                </FormControl> */}
            </DialogContent>
            <DialogActions>
                <Button autoFocus type="submit" color="primary" onClick={
                    () => {
                        handleSubmit(demandTemplateSelected);
                        handleClose();
                    }

                }>
                    Get
                </Button>
                <Button autoFocus onClick={handleClose} color="primary">
                    Cancel
                </Button>
            </DialogActions>
            \
        </Dialog>);
}
export default GetDemandTemplateDialog;