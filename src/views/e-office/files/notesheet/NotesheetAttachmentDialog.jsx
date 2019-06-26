import React, { Component } from "react";
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent, Icon,
  IconButton,
  Slide,
  Toolbar, Tooltip,
  Typography, withStyles
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import DetailViewRow from "../../common/DetailViewRow";
import Divider from "@material-ui/core/Divider";
import Attachment from "@material-ui/icons/AttachFile";
const styles = {
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  },
  editor: {
    minHeight: 200
  }
};

class NotesheetAttachmentDialog extends Component {
  render() {
    const { open, onClose, attachments,classes } = this.props;

    return (
      <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={"sm"}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton href={"#"} color="inherit" onClick={onClose} aria-label="Close">
              <CloseIcon/>
            </IconButton>
            <Typography variant="subtitle2" color="inherit" className={classes.flex}>
              Notesheet Attachments
            </Typography>
            <Button href={"#"} onClick={onClose} color="inherit">
              Close
            </Button>
          </Toolbar>
        </AppBar>

        <DialogContent>
          {attachments.map((item,index)=>
          <DetailViewRow icon={<Attachment/>} key={index} secondary={item.name}>
            <Tooltip title={"Click here to view the details"}>
              <IconButton href={item.path} target={"_blank"}>
                <Icon color={"primary"} fontSize={"small"}>remove_red_eye</Icon>
              </IconButton>
            </Tooltip>
          </DetailViewRow>
          )}

        </DialogContent>
        <Divider/>
        <DialogActions>
          <Button href={"#"} onClick={onClose} color={"secondary"} variant={"outlined"}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles) (NotesheetAttachmentDialog);