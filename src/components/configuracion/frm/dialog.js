import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AlertDialog(props) {
  let { open, setOpen } = props;

  const handleClose = () => {
    setOpen({ Title: props.Title, Content: props.Content, open: false });
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.Title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.Content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button
            onClick={() => {
              if (props.ItemId)
                props.AgreeFunction(props.ItemId).then(
                  (res) => handleClose(),
                  (err) => console.log(err)
                );
              else
                props.AgreeFunction().then(
                  (res) => handleClose(),
                  (err) => console.log(err)
                );
            }}
            color="primary"
            autoFocus
          >
            Si
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
