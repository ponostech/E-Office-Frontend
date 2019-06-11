import React, { Component } from "react";
import {
  AppBar,
  Button,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Typography,
  withStyles
} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import CloseIcon from "@material-ui/icons/Close";
import Divider from "@material-ui/core/Divider";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import { DetailViewRow } from "../../common/ApplicationDetailsDialog";
import moment from "moment";

const styles = {
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  }
};

class ReceiptDetailDialog extends Component {
  render() {
    const { open, onClose, receipt, classes } = this.props;

    return (
      <Dialog open={open} onClose={onClose} fullScreen={true}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton href={"#"} color="inherit" onClick={onClose} aria-label="Close">
              <CloseIcon/>
            </IconButton>
            <Typography variant="subtitle2" color="inherit" className={classes.flex}>
              Receipt No : {receipt ? receipt.number : ""}
            </Typography>
            <Button href={"#"} onClick={onClose} color="inherit">
              Close
            </Button>
          </Toolbar>
        </AppBar>

        <DialogTitle title={`Subject : ${receipt ? receipt.subject : ""}`}/>

        <DialogContent>

          <GridContainer>
            <GridItem md={6} lg={6}>
              <CardHeader title={"Receipt Detail"}/>

              <DetailViewRow primary={"Receipt No"} secondary={receipt ? receipt.number : "NA"}/>
              <DetailViewRow primary={"Subject"} secondary={receipt ? receipt.subject : "NA"}/>
              <DetailViewRow primary={"Classification"} secondary={receipt ? receipt.classification : "NA"}/>
              <DetailViewRow primary={"Branch"} secondary={receipt ? receipt.branch : "NA"}/>
              <DetailViewRow primary={"Type"} secondary={receipt ? receipt.type : "NA"}/>
              <DetailViewRow primary={"Mode of Delivery"} secondary={receipt ? receipt.delivery_mode : "NA"}/>
              <DetailViewRow primary={"Language"} secondary={receipt ? receipt.language : "NA"}/>
              <DetailViewRow primary={"Letter Date"}
                             secondary={receipt ? moment(receipt.letter_date).format("Do MMM YYY") : "NA"}/>
              <DetailViewRow primary={"Received On"}
                             secondary={receipt ? moment(receipt.received_date).format("Do MMM YYY") : "NA"}/>
              <DetailViewRow primary={"Type of Sender"} secondary={receipt ? receipt.sender_type : "NA"}/>
              <DetailViewRow primary={"Sender Address"} secondary={receipt ? receipt.sender_address : "NA"}/>
              <DetailViewRow primary={"Letter References"} secondary={receipt ? receipt.letter_ref_no : "NA"}/>
            </GridItem>
            <GridItem md={6} lg={6}>
              <CardHeader title={"DOCUMENT"}/>
              <Paper style={{ margin: 10, padding: 20 }}>
                <object style={{ height: "80vh" }} data={receipt ? receipt.document : undefined} type="application/pdf"
                        width="100%"
                        height="100%">
                  {/*<p>It appears you don't have a PDF plugin for this browser. You can <a href={receipt.document}>click*/}
                  {/*  here to download the PDF file.</a></p>*/}
                </object>
              </Paper>
            </GridItem>
          </GridContainer>
        </DialogContent>

        <Divider component={"li"}/>
        <DialogActions>
          <Button href={"#"} variant={"text"} onClick={onClose} color={"primary"}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(ReceiptDetailDialog);