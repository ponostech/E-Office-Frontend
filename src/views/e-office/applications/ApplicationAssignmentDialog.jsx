import React, { Component } from "react";
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Toolbar,
  Typography
} from "@material-ui/core";
import OfficeSelect from "../../../components/OfficeSelect";
import PropTypes from "prop-types";
import CloseIcon from "@material-ui/icons/Close";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";

const styles = {
  dialogPaper: {
    minHeight: "80vh",
    maxHeight: "80vh"
  }
};

class ApplicationAssignmentDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applications: [],
      user: null,
      users: [
        { value: "1", label: "user one" },
        { value: "2", label: "user two" },
        { value: "3", label: "user three" },
        { value: "4", label: "user four" }
      ]
    };
  }

  handleClick = (e) => {
    const { onClose } = this.props;
    onClose(this.state.user);
  };

  handleSelect=(value)=>{
    this.setState({
      user:value
    })
  }
  render() {
    const { open, onClose, files, classes } = this.props;

    return (
      <Dialog fullScreen={true} open={open} onClose={onClose} fullWidth={true} maxWidth={"sm"}>
        <DialogContent>
          <GridContainer justify={"center"}>
            <GridItem xs={12} sm={12} md={12}>
              <AppBar color={"primary"}>
                <Toolbar variant={"regular"} title={"File endorsement"}>
                  <GridContainer justify={"space-between"}>
                    <Typography color={"inherit"} variant={"headline"}>
                      File Endorsement
                    </Typography>
                    <IconButton onClick={this.handleClick.bind(this)}>
                      <CloseIcon color={"default"}/>
                    </IconButton>
                  </GridContainer>
                </Toolbar>
              </AppBar>
            </GridItem>

            <GridItem xs={12} sm={12} md={12}>

              <div style={{ marginTop: 80 }}>
                {files}
                <OfficeSelect value={this.state.user} onChange={this.handleSelect.bind(this)} options={this.state.users} label={"Endorse to"} variant={"outlined"} fullWidth={true}/>
              </div>
            </GridItem>
          </GridContainer>
        </DialogContent>
        <DialogActions>
          <Button variant={"outlined"} color={"primary"} onClick={this.handleClick.bind(this)}>Assign</Button>
          <Button variant={"outlined"} color={"secondary"} onClick={this.handleClick.bind(this)}>Cancel</Button>

        </DialogActions>
      </Dialog>
    );
  }
}

ApplicationAssignmentDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  files: PropTypes.array
};
export default (ApplicationAssignmentDialog);