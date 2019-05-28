import React, { Component } from "react";
import {
  Button,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  Divider, IconButton,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";
import PropTypes from "prop-types";
import CloseIcon from '@material-ui/icons/Close'

class SiteVerificationDetailDialog extends Component {
  state = {
    rows: []
  };

  componentDidMount() {

  };


  render() {
    const { open, onClose, file,verification } = this.props;
    let rows = [];

    if (verification) {
      const elements = verification.template.formElements;
      elements.forEach(function(element, index) {
        let val = {
          label: element.elementConfig.label,
          value: element.value.value ? element.value.value : element.value
        };
        console.log("form elelemt",index)
        rows.push(val);
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