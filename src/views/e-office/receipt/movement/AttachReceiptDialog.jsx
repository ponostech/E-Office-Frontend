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



  handleClose = (e) => {
    const { selectedFile } = this.state;
    this.props.onClose(selectedFile.value);
  };
  handleChange = (val) => {
    const { data } = this.state;
    this.setState({selectedFile:val})
  };

  render() {
    const { open, classes,files } = this.props;
    return (
      <Dialog fullWidth={true} maxWidth={"sm"} open={open} onClose={e=>this.props.onClose(null)}>

        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton href={"#"} color="inherit" onClick={e=>this.props.onClose(null)} aria-label="Close">
              <CloseIcon/>
            </IconButton>
            <Typography variant="subtitle2" color="inherit" className={classes.flex}>
              Attach Receipt to : {this.state.selectedFile ? this.state.selectedFile.label : ""}
            </Typography>
            <Button href={"#"} onClick={e=>this.props.onClose(null)} color="inherit">
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
            onChange={this.handleChange.bind(this)}/>

          <Divider component={"li"} style={{ marginBottom: 10, marginTop: 10 }}/>

          <DetailViewRow primary={"Receipt No"} secondary={""}/>
          <DetailViewRow primary={"Subject"} secondary={""}/>
          <DetailViewRow primary={"Branch"} secondary={""}/>
          <DetailViewRow primary={"Type"} secondary={""}/>
          <DetailViewRow primary={"Letter Date"} secondary={""}/>
          <DetailViewRow primary={"Received on"} secondary={""}/>
        </DialogContent>

        <Divider component={"li"} style={{ marginBottom: 10, marginTop: 10 }}/>
        <DialogActions>
          <Button disabled={this.state.selectedFile === null}
                  href={"#"} onClick={this.handleClose.bind(this)} color={"primary"}
                  variant={"text"}>Attach</Button>
          <Button href={"#"} onClick={this.handleClose.bind(this)} color={"secondary"}
                  variant={"text"}>Close</Button>
        </DialogActions>

      </Dialog>
    );
  }
}

AttachReceiptDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  files: PropTypes.array.isRequired
};

export default withStyles(styles)(AttachReceiptDialog);