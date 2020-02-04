import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

const OnlinePaymentModal = ({ open, amount, handleOnlineModelClose }) => {
  const classes = useStyles();

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleOnlineModelClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <span>TID: </span>
            <span>Merchant ID: </span>
            <span>Order ID: </span>
            <span>Amount: {amount}</span>
            <span>Currency: </span>
            <span>Redirect URL: </span>
            <span>Cancel URL: </span>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default OnlinePaymentModal;
