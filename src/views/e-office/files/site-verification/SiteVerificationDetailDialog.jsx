import React, { Component } from "react";
import {
  Button,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText, Typography
} from "@material-ui/core";
import PropTypes from "prop-types";
import CloseIcon from "@material-ui/icons/Close";

class SiteVerificationDetailDialog extends Component {
  state = {
    rows: [],
    attachments: []
  };

  componentDidMount() {

  };


  render() {
    const { open, onClose, file, verification } = this.props;
    let rows = [];
    let attachments = [];

    if (verification) {
      const elements = verification.template.formElements;
      elements.forEach(function(element, index) {
        if (Array.isArray(element.value)) {
          element.value.forEach(item => attachments.push({ name: item.name, value: item.location }));
        } else {
          let val = {
            label: element.elementConfig.label,
            value: element.value.value ? element.value.value : element.value
          };
          rows.push(val);
        }
      });
    }

    // this.setState({ rows });
    return (
      <Dialog fullWidth={true} maxWidth={"md"} open={open} onClose={onClose}>
        <CardHeader title={`FILE NUMBER : ${file.number}`} subheader={`SITE VERIFICATION OF ${file.subject}`} action={
          <IconButton onClick={onClose}>
            <CloseIcon color={"action"}/>
          </IconButton>
        }/>
        <Divider/>

        <DialogContent>
          <List>
            {
              rows.map((row, index) => (
                <>
                  <ListItem key={index}>
                    <ListItemText primary={row.label} secondary={row.value}/>
                  </ListItem>
                  <Divider/>
                </>
              ))
            }
          </List>
        <Typography variant={"h6"}>Attachment</Typography>
        <List>
            {
              attachments.map((row, index) => (
                <>
                  <ListItem key={index}>
                    <ListItemText primary={row.name}/>
                  </ListItem>
                  <Divider/>
                </>
              ))
            }
          </List>
        </DialogContent>

        <DialogActions>
          <Button variant={"outlined"} color={"secondary"} onClick={onClose}>Close</Button>
        </DialogActions>

      </Dialog>
    );
  }
}

SiteVerificationDetailDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  file: PropTypes.object.isRequired,
  verification: PropTypes.object.isRequired
};

export default SiteVerificationDetailDialog;