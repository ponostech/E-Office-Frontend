import React, { Component } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  Typography,
  withStyles
} from "@material-ui/core";
import OfficeSelect from "../../../../components/OfficeSelect";
import PropTypes from "prop-types";
import CloseIcon from "@material-ui/icons/Close";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import { DetailViewRow } from "../../../common/ApplicationDetailsDialog";
import moment from "moment";

const styles = {
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  }
};

class AttachReceiptDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: null
    };
  }

  handleClose = name => {
    const { selectedFile } = this.state;
    const { receipt } = this.props;
    if (name === "submit") this.props.onClose(receipt.id, selectedFile.value);
    else this.props.onClose(null, null);
  };
  handleChange = val => {
    this.setState({ selectedFile: val });
  };

  render() {
    const { open, classes, files, receipt } = this.props;
    return (
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
        onClose={e => this.props.onClose(null, null)}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              href={"#"}
              color="inherit"
              onClick={e => this.props.onClose(null, null)}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              variant="subtitle2"
              color="inherit"
              className={classes.flex}
            >
              Attach Receipt to :{" "}
              {this.state.selectedFile ? this.state.selectedFile.label : ""}
            </Typography>
            <Button
              href={"#"}
              onClick={e => this.props.onClose(null, null)}
              color="inherit"
            >
              Close
            </Button>
          </Toolbar>
        </AppBar>

        <DialogContent>
          <OfficeSelect
            value={this.state.selectedFile}
            options={files}
            name={"selectedFile"}
            label={"Attached To"}
            margin={"dense"}
            variant={"outlined"}
            fullWidth={true}
            onChange={this.handleChange.bind(this)}
          />

          <Divider
            component={"li"}
            style={{ marginBottom: 10, marginTop: 10 }}
          />
          {receipt ? (
            <>
              <DetailViewRow primary={"Receipt No"} secondary={receipt.no} />
              <DetailViewRow primary={"Subject"} secondary={receipt.subject} />
              <DetailViewRow primary={"Branch"} secondary={receipt.branch} />
              <DetailViewRow primary={"Type"} secondary={receipt.type} />
              <DetailViewRow
                primary={"Letter Date"}
                secondary={moment(receipt.letter_date).format("Do MMM YYY")}
              />
              <DetailViewRow
                primary={"Received on"}
                secondary={moment(receipt.received_date).format("Do MMM YYY")}
              />
            </>
          ) : (
            ""
          )}
        </DialogContent>

        <Divider component={"li"} style={{ marginBottom: 10, marginTop: 10 }} />
        <DialogActions>
          <Button
            disabled={this.state.selectedFile === null}
            href={"#"}
            onClick={this.handleClose.bind(this, "submit")}
            color={"primary"}
            variant={"text"}
          >
            Attach
          </Button>
          <Button
            href={"#"}
            onClick={this.handleClose.bind(this, "close")}
            color={"secondary"}
            variant={"text"}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

AttachReceiptDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  files: PropTypes.array.isRequired,
  receipt: PropTypes.object.isRequired
};

export default withStyles(styles)(AttachReceiptDialog);
