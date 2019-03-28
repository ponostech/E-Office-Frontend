import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton
} from "@material-ui/core";
import React from "react";
import TickIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from "prop-types";
import GridContainer from "./Grid/GridContainer";
import { grayColor, hexToRgb, whiteColor } from "../assets/jss/material-dashboard-pro-react";
import withStyles from "@material-ui/core/es/styles/withStyles";

const style = {
  icon: {
    color: "rgba(" + hexToRgb(whiteColor) + ", 0.76)",
    margin: "10px auto 0",
    width: "130px",
    height: "130px",
    border: "1px solid " + grayColor[11],
    borderRadius: "50%",
    lineHeight: "174px",
    textAlign:"center",
    "& svg": {
      width: "55px",
      height: "55px"
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      width: "55px",
      fontSize: "55px"
    }
  }
};

const ApplicationSubmitSuccessDialog = (props) => {

  const { open, onClose, message, title, classes, ...rest } = props;

  return (
    <Dialog open={open} onClose={onClose} {...rest}>
      <DialogContent>
        <Card>
          <CardHeader title={title} action={
            <IconButton onClick={onClose}>
              <CloseIcon/>
            </IconButton>
          }/>
          <CardContent>
            <GridContainer justify={"center"} direction={"column"}>
              <div className={classes.icon}>
                <TickIcon color={"primary"}/>
              </div>
              <div>
              <p>{message}</p>
              </div>
            </GridContainer>
          </CardContent>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color={"primary"} variant={"text"}>OK</Button>
      </DialogActions>
    </Dialog>
  );
};
ApplicationSubmitSuccessDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.bool.isRequired,
  message: PropTypes.string,
  title: PropTypes.string
};

export default withStyles(style)(ApplicationSubmitSuccessDialog);