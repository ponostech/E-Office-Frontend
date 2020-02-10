import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { List, ListItem, ListItemText, Divider } from "@material-ui/core";

const OnlinePaymentDialog = props => {
  const { open, handleClose, challan } = props;

  if (!challan) return true;

  const {
    id,
    user_id,
    number,
    challanable_id,
    challanable_type,
    details,
    head,
    status,
    type
  } = challan;

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Pay by Online</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <List>
              <ListItem button>
                <ListItemText primary="Challan Number" secondary={number} />
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemText primary="Challan Details" secondary={details} />
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemText
                  primary="Challan Head"
                  secondary={head.toUpperCase()}
                />
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemText
                  primary="Challan Status"
                  secondary={status.toUpperCase()}
                />
              </ListItem>
              <Divider />
            </List>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Pay Now
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OnlinePaymentDialog;
